import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import {
  GetOneStudentResponse,
  GetStudentsResponse,
  Student,
  UpdateStudentResponse,
} from '../types/student';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentStatus, UserRole } from '../types/user';
import { databaseProviders } from '../database.providers';
import * as Joi from 'joi';

@Injectable()
export class StudentService {
  filter(student: User): Student {
    const {
      pwd,
      currentTokenId,
      isActive,
      role,
      fullName,
      company,
      maxReservedStudents,
      headHunter,
      ...other
    } = student;
    return other;
  }

  getProfile(student: User): Student {
    return this.filter(student);
  }

  async update(
    student: User,
    profile: UpdateStudentDto,
  ): Promise<UpdateStudentResponse> {
    const foundStudent = await User.findOne({ where: { id: student.id } });

    foundStudent.email = profile.email;
    foundStudent.phone = profile.phone;
    foundStudent.firstName = profile.firstName;
    foundStudent.lastName = profile.lastName;
    foundStudent.githubUsername = profile.githubUsername;
    foundStudent.portfolioUrls = profile.portfolioUrls;
    foundStudent.projectUrls = profile.projectUrls;
    foundStudent.bio = profile.bio;
    foundStudent.expectedTypeWork = profile.expectedTypeWork;
    foundStudent.targetWorkCity = profile.targetWorkCity;
    foundStudent.expectedContractType = profile.expectedContractType;
    foundStudent.expectedSalary = profile.expectedSalary;
    foundStudent.canTakeApprenticeship = profile.canTakeApprenticeship;
    foundStudent.monthsOfCommercialExp = profile.monthsOfCommercialExp;
    foundStudent.education = profile.education;
    foundStudent.workExperience = profile.workExperience;
    foundStudent.courses = profile.courses;

    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }

  async getOneStudent(id: string): Promise<GetOneStudentResponse> {
    const student = await User.findOne({
      where: {
        id: id,
        role: UserRole.STUDENT,
        isActive: true,
      },
    });
    return {
      isSuccess: true,
      data: this.filter(student),
    };
  }

  async getAll(pageNumber: number): Promise<GetStudentsResponse> {
    const maxPerPage = 10;
    const currentPage = Number(pageNumber);

    const [data, pagesCount] = await User.findAndCount({
      where: {
        role: UserRole.STUDENT,
        isActive: true,
        status: StudentStatus.AVAILABLE,
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const totalPages = Math.ceil(pagesCount / maxPerPage);

    return {
      isSuccess: true,
      data: data.map((student) => this.filter(student)),
      totalPages,
    };
  }

  async getStudentsForInterview(
    hr: User,
    pageNumber: number,
  ): Promise<GetStudentsResponse> {
    const maxPerPage = 10;
    const currentPage = Number(pageNumber);

    const [data, pagesCount] = await User.findAndCount({
      relations: ['headHunter'],
      where: {
        role: UserRole.STUDENT,
        isActive: true,
        status: StudentStatus.INTERVIEW,
        headHunter: { id: hr.id },
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const totalPages = Math.ceil(pagesCount / maxPerPage);

    return {
      isSuccess: true,
      data: data.map((student) => this.filter(student)),
      totalPages,
    };
  }

  async setEmployed(student: User): Promise<UpdateStudentResponse> {
    const foundStudent = await User.findOne({
      where: {
        id: student.id,
      },
    });

    foundStudent.status = StudentStatus.EMPLOYED;
    foundStudent.isActive = false;
    foundStudent.currentTokenId = null;
    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }

  async setFilter(body: any, pageNumber: number) {
    const schema = Joi.object().keys({
      courseEngagment: Joi.array().items(Joi.number().min(1).max(5)),
      courseCompletion: Joi.array().items(Joi.number().min(1).max(5)),
      projectDegree: Joi.array().items(Joi.number().min(1).max(5)),
      teamProjectDegree: Joi.array().items(Joi.number().min(1).max(5)),
      expectedTypeWork: Joi.array().items(
        Joi.string().valid(
          'Na miejscu',
          'Gotowość do przeprowadzki',
          'Wyłącznie zdalnie',
          'Hybrydowo',
          'Bez znaczenia',
        ),
      ),
      expectedContractType: Joi.array().items(
        Joi.string().valid(
          'Tylko UoP',
          'Możliwe B2B',
          'Możliwe UZ/UoD',
          'Brak',
        ),
      ),
      expectedSalary: Joi.array().items(Joi.number().min(0).max(999999)),
      canTakeApprenticeship: Joi.array().items(Joi.boolean()),
      monthsOfCommercialExp: Joi.array().items(Joi.number().max(120)),
    });

    const result = await schema.validate(body, { abortEarly: false });

    if (result.error) {
      return {
        isSuccess: false,
        errors: result.error.details,
      };
    } else {
      const maxPerPage = 10;
      const currentPage = pageNumber;

      const [data, count] = await (
        await databaseProviders[0].useFactory()
      )
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.courseEngagment IN (:courseEngagment)', {
          courseEngagment: body.courseEngagment,
        })
        .andWhere('user.courseCompletion IN (:courseCompletion)', {
          courseCompletion: body.courseCompletion,
        })
        .andWhere('user.projectDegree IN (:projectDegree)', {
          projectDegree: body.projectDegree,
        })
        .andWhere('user.teamProjectDegree IN (:teamProjectDegree)', {
          teamProjectDegree: body.teamProjectDegree,
        })
        .andWhere(
          '(user.expectedTypeWork IN (:expectedTypeWork) OR user.expectedTypeWork is null)',
          {
            expectedTypeWork: body.expectedTypeWork,
          },
        )
        .andWhere(
          '(user.expectedContractType IN (:expectedContractType) OR user.expectedContractType is null)',
          {
            expectedContractType: body.expectedContractType,
          },
        )
        .andWhere(
          '(user.expectedSalary is null OR (user.expectedSalary >= :expectedSalaryMin AND  user.expectedSalary <= :expectedSalaryMax))',
          {
            expectedSalaryMin: body.expectedSalary[0],
            expectedSalaryMax: body.expectedSalary[1],
          },
        )
        .andWhere(
          '(user.canTakeApprenticeship IN (:canTakeApprenticeship) OR user.canTakeApprenticeship is null)',
          {
            canTakeApprenticeship: body.canTakeApprenticeship,
          },
        )
        .andWhere(
          '(user.monthsOfCommercialExp >= (:monthsOfCommercialExp) OR user.monthsOfCommercialExp is null)',
          {
            monthsOfCommercialExp: body.monthsOfCommercialExp,
          },
        )
        .skip(maxPerPage * (currentPage - 1))
        .take(maxPerPage)
        .getManyAndCount();

      const totalPages = Math.ceil(count / maxPerPage);
      return {
        isSuccess: true,
        data: data.map((student) => this.filter(student)),
        totalPages,
      };
    }
  }
}

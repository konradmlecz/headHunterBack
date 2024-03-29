import { Injectable } from '@nestjs/common';
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
import { Interview } from '../user/interview.entity';

@Injectable()
export class StudentService {
  filter(student: User): Student {
    const {
      pwd,
      currentTokenId,
      isActive,
      role,
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

    const [data, pagesCount] = await Interview.findAndCount({
      relations: ['headHunter', 'interviewStudent'],
      where: {
        headHunter: { id: hr.id },
        interviewStudent: { isActive: true, role: UserRole.STUDENT },
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const totalPages = Math.ceil(pagesCount / maxPerPage);

    return {
      isSuccess: true,
      data: data.map((user) => this.filter(user.interviewStudent)),
      totalPages,
    };
  }

  async setEmployed(student: User): Promise<UpdateStudentResponse> {
    const foundStudent = await User.findOne({
      where: {
        id: student.id,
      },
    });

    const foundInterview = await Interview.findOne({
      relations: ['interviewStudent'],
      where: {
        interviewStudent: { id: student.id },
      },
    });

    foundInterview && foundInterview.remove();

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
      courseEngagement: Joi.array().min(1).items(Joi.number().min(1).max(5)),
      courseCompletion: Joi.array().min(1).items(Joi.number().min(1).max(5)),
      projectDegree: Joi.array().min(1).items(Joi.number().min(1).max(5)),
      teamProjectDegree: Joi.array().min(1).items(Joi.number().min(1).max(5)),
      expectedTypeWork: Joi.array()
        .min(1)
        .items(
          Joi.string().valid(
            'Na miejscu',
            'Gotowość do przeprowadzki',
            'Wyłącznie zdalnie',
            'Hybrydowo',
            'Bez znaczenia',
          ),
        ),
      expectedContractType: Joi.array()
        .min(1)
        .items(
          Joi.string().valid(
            'Tylko UoP',
            'Możliwe B2B',
            'Możliwe UZ/UoD',
            'Brak',
          ),
        ),
      expectedSalary: Joi.array().min(1).items(Joi.number().min(0).max(999999)),
      canTakeApprenticeship: Joi.array().min(1).items(Joi.boolean()),
      monthsOfCommercialExp: Joi.array().min(1).items(Joi.number().max(120)),
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
        .where('user.courseEngagement IN (:courseEngagement)', {
          courseEngagement: body.courseEngagement,
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
        .andWhere('(user.isActive = 1)')
        .andWhere('(user.role LIKE :term)', {
          term: UserRole.STUDENT,
        })
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

  async searchTermAvailable(term: string, pageNumber: number) {
    const maxPerPage = 10;
    const currentPage = pageNumber;

    const [data, count] = await (
      await databaseProviders[0].useFactory()
    )
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.expectedTypeWork LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.targetWorkCity LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.expectedContractType LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.canTakeApprenticeship LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.monthsOfCommercialExp LIKE :term', {
        term: `%${term}%`,
      })
      .skip(maxPerPage * (currentPage - 1))
      .take(maxPerPage)
      .getManyAndCount();

    const totalPages = Math.ceil(count / maxPerPage);

    return {
      isSuccess: true,
      data: data,
      totalPages,
    };
  }

  async searchTermInterview(term: string, pageNumber: number) {
    const maxPerPage = 10;
    const currentPage = pageNumber;

    const [data, count] = await (
      await databaseProviders[0].useFactory()
    )
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.firstName LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.lastName LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.expectedTypeWork LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.targetWorkCity LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.expectedContractType LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.canTakeApprenticeship LIKE :term', {
        term: `%${term}%`,
      })
      .orWhere('user.monthsOfCommercialExp LIKE :term', {
        term: `%${term}%`,
      })
      .skip(maxPerPage * (currentPage - 1))
      .take(maxPerPage)
      .getManyAndCount();

    const totalPages = Math.ceil(count / maxPerPage);

    return {
      isSuccess: true,
      data: data,
      totalPages,
    };
  }
}

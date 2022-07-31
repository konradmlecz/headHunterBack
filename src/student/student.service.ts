import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import {
  GetStudentsResponse,
  Student,
  UpdateStudentResponse,
} from '../types/student';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentStatus, UserRole } from '../types/user';
import { filter } from 'rxjs';

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
    const {
      id,
      email,
      phone,
      firstName,
      lastName,
      githubUsername,
      portfolioUrls,
      projectUrls,
      bio,
      expectedTypeWork,
      targetWorkCity,
      expectedContractType,
      expectedSalary,
      canTakeApprenticeship,
      monthsOfCommercialExp,
      education,
      workExperience,
      courses,
    } = student;

    return {
      id,
      email,
      phone,
      firstName,
      lastName,
      githubUsername,
      portfolioUrls,
      projectUrls,
      bio,
      expectedTypeWork,
      targetWorkCity,
      expectedContractType,
      expectedSalary,
      canTakeApprenticeship,
      monthsOfCommercialExp,
      education,
      workExperience,
      courses,
    };
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
}

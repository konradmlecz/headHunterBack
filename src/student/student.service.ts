import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Student } from '../types/student';

@Injectable()
export class StudentService {
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
}

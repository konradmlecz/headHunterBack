import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Student, updateStudentResponse } from '../types/student';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UserRole } from '../types/user';

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

  async update(
    student: User,
    profile: UpdateStudentDto,
  ): Promise<updateStudentResponse> {
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

  async getAll() {
    const students = await User.find({
      where: {
        role: UserRole.STUDENT,
        isActive: true,
      },
    });

    return students;
  }
}

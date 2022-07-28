import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import {
  GetAllStudentsResponse,
  Student,
  updateStudentResponse,
} from '../types/student';
import { SetPassword, UpdateStudentDto } from './dto/update-student.dto';
import { UserRole } from '../types/user';
import * as bcrypt from 'bcrypt';

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

  async getAll(): Promise<GetAllStudentsResponse[]> {
    const students = await User.find({
      where: {
        role: UserRole.STUDENT,
        isActive: true,
      },
    });

    return students.map(
      ({ pwd, currentTokenId, isActive, status, role, ...other }) => other,
    );
  }

  async setPassword({ id, pwd }: SetPassword) {
    const foundStudent = await User.findOne({
      where: {
        id: id,
      },
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    foundStudent.currentTokenId = null;
    foundStudent.pwd = hashedPwd;

    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }
}

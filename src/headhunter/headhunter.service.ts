import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { StudentStatus, UserRole } from '../types/user';
import {
  SetDisinterestResponse,
  SetStudentInterviewResponse,
} from '../types/headhunter';
import { GetAllStudentsResponse } from '../types/student';

@Injectable()
export class HeadhunterService {
  async getAll(): Promise<GetAllStudentsResponse[]> {
    const students = await User.find({
      where: {
        role: UserRole.STUDENT,
        isActive: true,
        status: StudentStatus.AVAILABLE,
      },
    });

    return students.map(
      ({ pwd, currentTokenId, isActive, status, role, ...other }) => other,
    );
  }

  async setToInterview(
    hr: User,
    id: string,
  ): Promise<SetStudentInterviewResponse> {
    const reservedStudents = await User.count({
      relations: ['headHunter'],
      where: {
        headHunter: { id: hr.id },
      },
    });

    if (reservedStudents >= hr.maxReservedStudents) {
      throw new HttpException(
        `Maximum students to be interviwed is ${hr.maxReservedStudents}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundStudent = await User.findOne({
      relations: ['headHunter'],
      where: {
        id,
      },
    });

    if (foundStudent.status !== StudentStatus.AVAILABLE) {
      throw new HttpException(
        'Student must have available status!',
        HttpStatus.BAD_REQUEST,
      );
    }

    foundStudent.status = StudentStatus.INTERVIEW;
    foundStudent.headHunter = hr;
    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }

  async setDisinterest(id: string): Promise<SetDisinterestResponse> {
    const foundStudent = await User.findOne({
      relations: ['headHunter'],
      where: {
        id,
      },
    });

    foundStudent.status = StudentStatus.AVAILABLE;
    foundStudent.headHunter = null;
    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { StudentStatus } from '../types/user';
import {
  SetDisinterestResponse,
  SetStudentInterviewResponse,
} from '../types/headhunter';
import { UpdateStudentResponse } from '../types/student';

@Injectable()
export class HeadhunterService {
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
    foundStudent.addedToInterviewAt = new Date();
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
    foundStudent.addedToInterviewAt = null;
    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }

  async setEmployed(id: string): Promise<UpdateStudentResponse> {
    try {
      const foundStudent = await User.findOne({
        where: {
          id,
        },
      });

      foundStudent.status = StudentStatus.EMPLOYED;
      foundStudent.isActive = false;
      foundStudent.currentTokenId = null;
      foundStudent.addedToInterviewAt = null;
      await foundStudent.save();

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: error.message,
      };
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { StudentStatus } from '../types/user';
import {
  SetDisinterestResponse,
  SetStudentInterviewResponse,
} from '../types/headhunter';
import { UpdateStudentResponse } from '../types/student';
import { Interview } from '../user/interview.entity';

@Injectable()
export class HeadhunterService {
  async setToInterview(
    hr: User,
    id: string,
  ): Promise<SetStudentInterviewResponse> {
    const reservedStudents = await Interview.count({
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

    const newInterview = new Interview();
    newInterview.interviewStudent = foundStudent;
    newInterview.headHunter = hr;

    await newInterview.save();

    return {
      isSuccess: true,
    };
  }

  async setDisinterest(hr: User, id: string): Promise<SetDisinterestResponse> {
    const foundInterview = await Interview.findOne({
      relations: ['headHunter', 'interviewStudent'],
      where: {
        headHunter: { id: hr.id },
        interviewStudent: { id },
      },
    });

    await foundInterview.remove();

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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { StudentStatus } from '../types/user';
import { SetStudentInterviewResponse } from '../types/headhunter';

@Injectable()
export class HeadhunterService {
  async setToInterview(
    hr: User,
    id: string,
  ): Promise<SetStudentInterviewResponse> {
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
}

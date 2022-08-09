import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { User } from '../user/user.entity';
import { StudentStatus, UserRole } from '../types/user';

@Injectable()
export class CronService {
  @Cron('0 */12 * * *')
  async updateStatus() {
    const tenDays = 1000 * 60 * 60 * 24 * 10;

    const studentsToInterview = await User.find({
      where: {
        role: UserRole.STUDENT,
        isActive: true,
        status: StudentStatus.INTERVIEW,
      },
    });

    if (studentsToInterview.length !== 0) {
      studentsToInterview
        .filter(
          (student) => +student.addedToInterviewAt + tenDays < +new Date(),
        )
        .map(async (student) => {
          const foundStudent = await User.findOne({
            where: { id: student.id },
          });
          foundStudent.status = StudentStatus.AVAILABLE;
          foundStudent.headHunter = null;
          await foundStudent.save();
        });
    }
  }
}

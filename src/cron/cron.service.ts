import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Interview } from '../user/interview.entity';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_12_HOURS)
  async updateStatus() {
    const tenDays = 1000 * 60 * 60 * 24 * 10;

    const interviews = await Interview.find();

    if (interviews.length !== 0) {
      interviews
        .filter((interview) => +interview.createdAt + tenDays < +new Date())
        .map(async (interview) => {
          const foundInterview = await Interview.findOne({
            where: { id: interview.id },
          });
          await foundInterview.remove();
        });
    }
  }
}

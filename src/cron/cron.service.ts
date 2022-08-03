import { Injectable } from '@nestjs/common';
import { Cron } from "@nestjs/schedule";
import { User } from "../user/user.entity";
import { StudentStatus } from "../types/user";
import { StudentToInterview } from "../student/student-to-interview.entity";

@Injectable()
export class CronService {

    @Cron("0 */12 * * *")
    async updateStatus() {

        const tenDays = 1000 * 60 * 60 * 24 * 10;

        const studentsToInterview = await StudentToInterview.find();

        if (studentsToInterview.length !== 0) {

            studentsToInterview
                .filter(student => +student.createdAt + tenDays < +new Date())
                .map(async student => {

                    const foundStudent = await User.findOne({where: {id: student.studentId}});
                    foundStudent.status = StudentStatus.AVAILABLE;
                    foundStudent.headHunter = null;
                    await foundStudent.save();

                    const foundStatus = await StudentToInterview.findOne({where: {studentId: student.studentId}});
                    await foundStatus.remove();
                });

        }

    }

}

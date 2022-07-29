import { Inject, Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import * as fs from 'fs/promises';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { User } from '../user/user.entity';
import { MailService } from '../mail/mail.service';
import { registerEmailTemplate } from '../templates/email/register';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../types/user';
import { registerStudent } from '../user/dto/student-register.dto';
import * as Joi from 'joi';

@Injectable()
export class AdminService extends AuthService {
  constructor(@Inject(MailService) private mailService: MailService) {
    super();
  }

  async import(files: MulterDiskUploadedFiles) {
    const student = (await files?.studentData?.[0]) ?? null;
    const studentsData: registerStudent[] = JSON.parse(
      await fs.readFile(
        path.join(storageDir(), 'student', `${student.filename}`),
        'utf-8',
      ),
    );

    const schema = Joi.array().items(
      Joi.object().keys({
        email: Joi.string().email(),
        courseCompletion: Joi.number().min(0).max(5),
        courseEngagement: Joi.number().min(0).max(5),
        projectDegree: Joi.number().min(0).max(5),
        teamProjectDegree: Joi.number().min(0).max(5),
        bonusProjectUrls: Joi.string(),
      }),
    );

    const result = await schema.validate(studentsData, { abortEarly: false });

    try {
      if (result.error) {
        await fs.unlink(path.join(storageDir(), 'student', student.filename));
        return {
          isSuccess: false,
          errors: result.error.details,
        };
      } else {
        studentsData.map(async (student: registerStudent) => {
          const user = new User();
          user.email = student.email;
          user.courseCompletion = student.courseCompletion;
          user.courseEngagment = student.courseEngagment;
          user.projectDegree = student.projectDegree;
          user.teamProjectDegree = student.teamProjectDegree;
          user.bonusProjectUrls = student.bonusProjectUrls;
          user.isActive = false;
          user.role = UserRole.STUDENT;

          await this.generateToken(user);
          await user.save();
          await this.mailService.sendMail(
            user.email,
            `Head Hunter |MEGAK| - dokończ rejestracje!`,
            registerEmailTemplate(user.id, user.currentTokenId),
          );
        });
        await fs.unlink(path.join(storageDir(), 'student', student.filename));
        return { isSuccess: true };
      }
    } catch (err) {
      throw err;
      try {
        if (student) {
          await fs.unlink(path.join(storageDir(), 'student', student.filename));
        }
      } catch (err2) {
        throw err2;
      }
      throw err;
    }
  }
}

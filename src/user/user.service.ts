import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { SetPassword } from './dto/set-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { changePasswordResponse } from '../types/user';
import { ForgetPassword } from './dto/forget-password.dto';
import { MailService } from '../mail/mail.service';
import { forgetPasswordEmailTemplate } from '../templates/email/forget';
import { IsNull, Not } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(@Inject(MailService) private mailService: MailService) {}

  async check(id: string, token: string, res: Response) {
    try {
      await User.findOneOrFail({
        where: {
          id,
          currentTokenId: token,
          pwd: null,
        },
      });
      res.json({
        isSuccess: true,
        message: '',
      });
    } catch (error) {
      res.status(401).json({
        isSuccess: false,
        message: 'The link is no longer active!',
      });
    }
  }

  async setPassword({ id, pwd, token }: SetPassword, res: Response) {
    try {
      const user = await User.findOneOrFail({
        where: {
          id,
          currentTokenId: token,
          pwd: null,
        },
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(pwd, salt);

      user.currentTokenId = null;
      user.pwd = hashedPwd;
      user.isActive = true;

      await user.save();

      res.json({
        isSuccess: true,
      });
    } catch (error) {
      res.status(401).json({
        isSuccess: false,
        message:
          'Setting password is impossible at this moment, contact with Administrator',
      });
    }
  }

  async forgetPassword({ email }: ForgetPassword, res: Response) {
    try {
      const user = await User.findOneOrFail({
        where: {
          email,
          pwd: Not(IsNull()),
        },
      });
      user.currentTokenId = uuid();
      await user.save();

      await this.mailService.sendMail(
        user.email,
        `Head Hunter |MEGAK| - Zmiana hasła!`,
        forgetPasswordEmailTemplate(user.id, user.currentTokenId),
      );

      res.json({
        isSuccess: true,
      });
    } catch (error) {
      res.status(401).json({
        isSuccess: false,
        message: 'Change password is not possible for this email address',
      });
    }
  }

  async changePassword(
    user: User,
    { newPwd }: ChangePasswordDto,
  ): Promise<changePasswordResponse> {
    const foundStudent = await User.findOne({
      where: {
        id: user.id,
      },
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(newPwd, salt);

    foundStudent.pwd = hashedPwd;
    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }
}

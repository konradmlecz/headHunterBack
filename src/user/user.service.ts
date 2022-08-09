import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { SetPassword } from './dto/set-password.dto';

@Injectable()
export class UserService {
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

  // async beforeSetPassword(id: string) {
  //   const foundStudent = await User.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //
  //   return {
  //     id: foundStudent.id,
  //     email: foundStudent.email,
  //   };
  // }
}

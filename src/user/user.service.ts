import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { SetPassword } from './dto/set-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { changePasswordResponse } from '../types/user';

@Injectable()
export class UserService {
  async register(id: string, token: string, res: Response) {
    const student = await User.findOneOrFail({
      where: {
        id,
        currentTokenId: token,
      },
    });

    if (!student) {
      res.status(401).json({
        message: 'Not active link',
      });
    } else {
      console.log();
      res.redirect(`http://localhost:3001/user/setpassword/${id}`);
    }
  }

  async setPassword({ id, pwd }: SetPassword) {
    const foundStudent = await User.findOne({
      where: {
        id,
      },
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    foundStudent.currentTokenId = null;
    foundStudent.pwd = hashedPwd;
    foundStudent.isActive = true;

    await foundStudent.save();

    return {
      isSuccess: true,
    };
  }

  async beforeSetPassword(id: string) {
    const foundStudent = await User.findOne({
      where: {
        id: id,
      },
    });

    return {
      id: foundStudent.id,
      email: foundStudent.email,
    };
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

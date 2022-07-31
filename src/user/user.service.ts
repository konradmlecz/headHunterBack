import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { registerUserResponse } from '../types/user';
import { Response } from 'express';
import { SetPassword } from '../student/dto/update-student.dto';

@Injectable()
export class UserService {
  // async register(newUser: RegisterAdminDto): Promise<registerUserResponse> {
  //   const { email, pwd, role } = newUser;
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPwd = await bcrypt.hash(pwd, salt);
  //
  //   const user = new User();
  //   user.email = email;
  //   user.pwd = hashedPwd;
  //   user.role = role;
  //
  //   await user.save();
  //
  //   return {
  //     isSuccess: true,
  //   };
  // }

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
}

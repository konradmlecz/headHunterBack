import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { registerUserResponse } from '../types/user';

@Injectable()
export class UserService {
  async register(newUser: RegisterAdminDto): Promise<registerUserResponse> {
    const { email, pwd, role } = newUser;
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    const user = new User();
    user.email = email;
    user.pwd = hashedPwd;
    user.role = role;

    await user.save();

    return {
      isSuccess: true,
    };
  }
}

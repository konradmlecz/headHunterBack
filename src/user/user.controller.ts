import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { registerUserResponse } from '../types/user';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/register')
  register(@Body() newUser: RegisterAdminDto): Promise<registerUserResponse> {
    return this.userService.register(newUser);
  }
}

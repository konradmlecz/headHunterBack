import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { registerUserResponse, UserRole } from '../types/user';
import { Role } from '../decorators/user-role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  @Role(UserRole.ADMIN)
  register(@Body() newUser: RegisterAdminDto): Promise<registerUserResponse> {
    return this.userService.register(newUser);
  }
}

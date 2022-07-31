import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import {
  BeforeSetPasswordResponse,
  registerUserResponse,
  UserRole,
} from '../types/user';
import { Role } from '../decorators/user-role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/guards/user-role.guard';
import { Response } from 'express';
import { SetPassword } from '../student/dto/update-student.dto';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  // Temporary endpoint with authentication and authorization
  //@Post('/register')
  //@UseGuards(AuthGuard('jwt'), UserRoleGuard)
  //@Role(UserRole.ADMIN)
  // register(@Body() newUser: RegisterAdminDto): Promise<registerUserResponse> {
  //   return this.userService.register(newUser);
  // }

  @Get('/register/:id/:token')
  async register(
    @Param('id') id: string,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    await this.userService.register(id, token, res);
  }

  @Get('/setpassword/:id')
  async beforeSetPassword(
    @Param('id') id: string,
  ): Promise<BeforeSetPasswordResponse> {
    return this.userService.beforeSetPassword(id);
  }

  @Post('/setpassword')
  async setPassword(@Body() req: SetPassword): Promise<any> {
    return this.userService.setPassword(req);
  }
}

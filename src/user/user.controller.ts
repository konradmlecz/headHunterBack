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
import {
  BeforeSetPasswordResponse,
  changePasswordResponse,
} from '../types/user';
import { Response } from 'express';
import { SetPassword } from './dto/set-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from './user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get('/check/:id/:token')
  async register(
    @Param('id') id: string,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    await this.userService.check(id, token, res);
  }

  @Post('/setpassword')
  async setPassword(
    @Body() req: SetPassword,
    @Res() res: Response,
  ): Promise<any> {
    return this.userService.setPassword(req, res);
  }

  // @Get('/setpassword/:id')
  // async beforeSetPassword(
  //   @Param('id') id: string,
  // ): Promise<BeforeSetPasswordResponse> {
  //   return this.userService.beforeSetPassword(id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-password')
  async changePassword(
    @UserObj() user: User,
    @Body() newPwd: ChangePasswordDto,
  ): Promise<changePasswordResponse> {
    return this.userService.changePassword(user, newPwd);
  }
}

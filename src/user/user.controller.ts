import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BeforeSetPasswordResponse } from '../types/user';
import { Response } from 'express';
import { SetPassword } from './dto/set-password.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

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

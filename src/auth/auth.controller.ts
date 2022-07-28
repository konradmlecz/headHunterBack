import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from 'src/user/user.entity';
import { UserRoleGuard } from '../guards/user-role.guard';
import { SetPassword } from '../student/dto/update-student.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async userLogin(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

  @Get('/register/:id/:token')
  async register(
    @Param('id') id: string,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    await this.authService.register(id, token, res);
  }

  @Post('/setpassword')
  async setPassword(@Body() req: SetPassword): Promise<any> {
    console.log(1);
    return this.authService.setPassword(req);
  }
}

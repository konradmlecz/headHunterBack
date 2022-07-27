import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from "./admin.service";
import { registerEmailTemplate } from "../templates/email/register";

@Controller('admin')
export class AdminController {

  constructor(@Inject(MailService)private mailService: MailService) {
  }

  @Get('/')
  async addUser() {
    console.log('1');
    return await this.mailService.sendMail('a.kujawski90@gmail.com','Test',registerEmailTemplate())
  }
}

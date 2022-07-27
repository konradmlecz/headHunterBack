import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, html: string): Promise<any> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html,
      });

      return {mailSend: true}

    } catch (error) {
      console.log(error.message);
      return {mailSend: false}
    }
  }
}

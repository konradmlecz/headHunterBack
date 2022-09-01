import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [forwardRef(() => MailModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

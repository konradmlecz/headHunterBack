import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';

import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { HeadhunterModule } from './headhunter/headhunter.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    StudentModule,
    HeadhunterModule,
    MailModule,
    AdminModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Body, Inject, Module, Post, Res } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { AuthLoginDto } from '../auth/dto/auth-login.dto';
import { Response } from 'express';
import { SetPassword } from './dto/update-student.dto';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

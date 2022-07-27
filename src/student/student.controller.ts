import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';
import { StudentService } from './student.service';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from 'src/user/user.entity';
import { Student, updateStudentResponse } from '../types/student';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.STUDENT)
  getStudentProfile(@UserObj() student: User): Student {
    return this.studentService.getProfile(student);
  }

  @Patch('/profile')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.STUDENT)
  updateStudentProfile(
    @UserObj() student: User,
    @Body() profile: UpdateStudentDto,
  ): Promise<updateStudentResponse> {
    return this.studentService.update(student, profile);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  getAllStudents() {
    return this.studentService.getAll();
  }
}

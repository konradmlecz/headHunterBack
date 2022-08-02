import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';
import { StudentService } from './student.service';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from 'src/user/user.entity';
import {
  FilterStudent,
  GetOneStudentResponse,
  GetStudentsResponse,
  Student,
  UpdateStudentResponse,
} from '../types/student';
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
  ): Promise<UpdateStudentResponse> {
    return this.studentService.update(student, profile);
  }

  @Get('/all/:pageNumber?')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  getAllStudents(
    @Param('pageNumber') pageNumber = 1,
  ): Promise<GetStudentsResponse> {
    return this.studentService.getAll(pageNumber);
  }

  @Get('/for-interview/:pageNumber?')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  async getStudentsForInterview(
    @UserObj() hr: User,
    @Param('pageNumber') pageNumber = 1,
  ): Promise<GetStudentsResponse> {
    return this.studentService.getStudentsForInterview(hr, pageNumber);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  getOneStudent(@Param('id') id: string): Promise<GetOneStudentResponse> {
    return this.studentService.getOneStudent(id);
  }

  @Patch('/employed')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.STUDENT)
  async setEmployed(@UserObj() student: User): Promise<UpdateStudentResponse> {
    return this.studentService.setEmployed(student);
  }

  @Post('/set-filter')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  setFilter(@Body() body: FilterStudent): Promise<GetStudentsResponse> {
    return this.studentService.setFilter(body);
  }
}

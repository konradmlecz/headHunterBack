import {
  Body,
  Controller,
  Get,
  Inject,
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
  GetAllStudentsResponse,
  Student,
  UpdateStudentResponse,
} from '../types/student';
import { SetPassword, UpdateStudentDto } from './dto/update-student.dto';

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

  @Get('/all')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  getAllStudents(): Promise<GetAllStudentsResponse[]> {
    return this.studentService.getAll();
  }

  @Post('/setpassword')
  async userLogin(@Body() req: SetPassword): Promise<any> {
    console.log(1);
    return this.studentService.setPassword(req);
  }

  @Patch('/employed')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.STUDENT)
  async setEmployed(@UserObj() student: User): Promise<UpdateStudentResponse> {
    return this.studentService.setEmployed(student);
  }
}

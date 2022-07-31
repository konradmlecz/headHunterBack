import { Controller, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';
import { HeadhunterService } from './headhunter.service';
import {
  SetDisinterestResponse,
  SetStudentInterviewResponse,
} from '../types/headhunter';

@Controller('headhunter')
export class HeadhunterController {
  constructor(
    @Inject(HeadhunterService) private headhunterService: HeadhunterService,
  ) {}

  @Patch('/interview/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  async setToInterview(
    @UserObj() hr: User,
    @Param('id') id: string,
  ): Promise<SetStudentInterviewResponse> {
    return this.headhunterService.setToInterview(hr, id);
  }

  @Patch('/disinterest/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.HR)
  async setDisinterest(
    @Param('id') id: string,
  ): Promise<SetDisinterestResponse> {
    return this.headhunterService.setDisinterest(id);
  }
}

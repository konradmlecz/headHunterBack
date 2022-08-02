import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import * as path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { MailService } from '../mail/mail.service';
import { registerEmailTemplate } from '../templates/email/register';
import { ImportStudentsResponse } from '../interfaces/admin';
import { HeadhunterDto } from '../headhunter/dto/headhunter.dto';
import { AddHeadHunterResponse } from '../types/headhunter';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(MailService) private mailService: MailService,
    @Inject(AdminService) private adminService: AdminService,
  ) {}

  @Post('/import')
  //@UseGuards(AuthGuard('jwt'), UserRoleGuard)
  //@Role(UserRole.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'studentData',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'student')) },
    ),
  )
  import(
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<ImportStudentsResponse> {
    return this.adminService.import(files);
  }

  @Post('/headhunter')
  //@UseGuards(AuthGuard('jwt'), UserRoleGuard)
  //@Role(UserRole.ADMIN)
  addHeadHunter(@Body() body: HeadhunterDto): Promise<AddHeadHunterResponse> {
    return this.adminService.addHeadHunter(body);
  }
}

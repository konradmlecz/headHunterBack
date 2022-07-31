import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFiles,
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

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(MailService) private mailService: MailService,
    @Inject(AdminService) private adminService: AdminService,
  ) {}

  @Post('/import')
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
  addHeadHunter(@Body() body: HeadhunterDto): Promise<AddHeadHunterResponse> {
    return this.adminService.addHeadHunter(body);
  }
}

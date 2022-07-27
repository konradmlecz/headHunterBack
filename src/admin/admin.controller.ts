
import { Controller, Get, Inject, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AdminService } from "./admin.service";
import * as path from "path";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerStorage, storageDir } from "../utils/storage";
import { MulterDiskUploadedFiles } from "../interfaces/files";
import { MailService } from "../mail/mail.service";
import { registerEmailTemplate } from "../templates/email/register";
import { ImportStudentsResponse } from "../interfaces/admin";


@Controller('admin')
export class AdminController {


  constructor(
    @Inject(MailService)private mailService: MailService,
    @Inject(AdminService) private adminService: AdminService) {
  }
  //TEST

  // @Get('/')
  // async addUser() {
  //   console.log('1');
  //   return await this.mailService.sendMail('a.kujawski90@gmail.com', 'Test', registerEmailTemplate())
  // }

  @Post('/import')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'studentData', maxCount: 1
      },

    ], {storage: multerStorage(path.join(storageDir(), 'student'))},)
  )
  import(
    @UploadedFiles() files : MulterDiskUploadedFiles,
  ): Promise <ImportStudentsResponse> {
    return this.adminService.import(files)
  }
}


import { Controller, Inject, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AdminService } from "./admin.service";
import * as path from "path";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerStorage, storageDir } from "../utils/storage";
import { MulterDiskUploadedFiles } from "../interfaces/files";


@Controller('admin')
export class AdminController {


  constructor(@Inject(MailService)private mailService: MailService) {
  }

  @Get('/')
  async addUser() {
    console.log('1');
    return await this.mailService.sendMail('a.kujawski90@gmail.com','Test',registerEmailTemplate())

  constructor (
    @Inject(AdminService) private adminService: AdminService
  ){}

  @Post('/import')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'student', maxCount: 1
      },

    ], {storage: multerStorage(path.join(storageDir(), 'student'))},)
  )
  import(
    // @Body() req: AddProductDto,
    @UploadedFiles() files : MulterDiskUploadedFiles,
  ): Promise <string> {
    console.log('ok');
    return this.adminService.import(files)

  }
}

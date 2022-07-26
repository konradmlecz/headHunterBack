import { Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from "../interfaces/files";
import * as fs from "fs";
import path from "path";
import { storageDir } from "../utils/storage";

@Injectable()
export class AdminService {


  async import(files: MulterDiskUploadedFiles) {
    console.log('ok');
    const student = files?.student?.[0] ?? null;
    try {


      return 'ok';
      // if (student) {
      //   shopItem.photoFn = photo.filename
      // }
      //
      // await shopItem.save()
      //
      // return this.filter(shopItem);

    } catch (e) {
      console.log(e)
      try{
        if(student){
          fs.unlinkSync(
            path.join(storageDir(),'student',student.filename)
          )
        }
      }catch (e2){
        console.log(e2)
      }
      throw(e);
    }


  }
}

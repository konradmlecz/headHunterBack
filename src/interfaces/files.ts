export interface MulterDiskUploadedFiles {
  [fieldname: string]: {
    filename: string;
    size:number;
    mimetype: string;
    originalname: string;
    filedname: string;
    encoding: string;

  }[] | undefined;
}

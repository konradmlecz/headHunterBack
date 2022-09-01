import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgetPassword {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

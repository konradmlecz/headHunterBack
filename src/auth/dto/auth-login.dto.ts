import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @IsString()
  pwd: string;
}

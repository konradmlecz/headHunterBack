import { UserRole } from '../../types/user';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @IsNotEmpty()
  @IsString()
  pwd: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

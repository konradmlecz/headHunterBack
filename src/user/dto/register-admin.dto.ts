import { UserRole } from '../../types/user';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Password is too short',
  })
  @MaxLength(255, {
    message: 'Password is too long',
  })
  pwd: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

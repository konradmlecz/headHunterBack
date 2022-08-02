import { UserRole } from '../../types/user';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAdminDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  pwd: string;
  @IsNotEmpty()
  @IsString()
  role: UserRole;
}

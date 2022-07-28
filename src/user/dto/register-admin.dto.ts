import { UserRole } from '../../types/user';
import { IsString } from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  email: string;
  @IsString()
  pwd: string;
  @IsString()
  role: UserRole;
}

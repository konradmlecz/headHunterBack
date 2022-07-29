import { IsString } from 'class-validator';
import { UserRole } from '../../types/user';

export class AuthLoginDto {
  @IsString()
  email: string;
  @IsString()
  pwd: string;
}

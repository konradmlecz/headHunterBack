import { UserRole } from '../../types/user';

export class RegisterAdminDto {
  email: string;
  pwd: string;
  role: UserRole;
}

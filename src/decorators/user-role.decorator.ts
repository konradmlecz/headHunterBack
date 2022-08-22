import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/user';

export const Role = (role: UserRole) => SetMetadata('role', role);

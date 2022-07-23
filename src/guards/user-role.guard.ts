import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRole = this.reflector.getAllAndOverride<UserRole>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requireRole === user.role;
  }
}

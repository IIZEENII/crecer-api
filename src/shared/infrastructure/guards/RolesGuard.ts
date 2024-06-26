import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@src/employees/enums/Role';
import { ROLES_KEY } from '../decorators/Roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { employee } = context.switchToHttp().getRequest();

    const isAuthorized = requiredRoles.some((role) =>
      employee.roles.includes(role),
    );

    if (!isAuthorized) {
      throw new ForbiddenException('insufficient permissions');
    }

    return true;
  }
}

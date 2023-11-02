import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/roles/entities/role.entity';
import bypassUrl from './bypass-url';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const { originalUrl, user } = request;

    // bypass url from role guard
    if (bypassUrl.includes(originalUrl)) {
      return true;
    }

    return user && user.roles.some((role) => requireRoles.includes(role));
  }
}

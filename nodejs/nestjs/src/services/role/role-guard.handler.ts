import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class HandlerRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = 'user-id';
    const userRole = this.getUserRole(userId);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return roles?.includes(userRole) ?? true;
  }

  private getUserRole(userId: string) {
    return 'admin';
  }
}

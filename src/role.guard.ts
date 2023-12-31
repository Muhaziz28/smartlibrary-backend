import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('roles allowed =>', roles);
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('role user =>', user['role'])
        // Proses untuk memeriksa apakah pengguna memiliki salah satu peran yang diperlukan
        const userHasRequiredRole = roles.some(role => user['role'] === role);
        return userHasRequiredRole;
    }
}
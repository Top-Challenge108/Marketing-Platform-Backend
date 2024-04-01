import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../modules/permissions/permissions.service';
import { UserService } from '../modules/user/user.service';
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly permissionsService;
    private readonly userService;
    constructor(reflector: Reflector, permissionsService: PermissionsService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

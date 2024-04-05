import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionDto } from '../common/common.dto';
import { IJwtPayload } from '../modules/auth/payloads/jwt-payload.payload';
import { PermissionsService } from '../modules/permissions/permissions.service';
import { UserService } from '../modules/user/user.service';
import * as _ from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(PermissionsService)
    private readonly permissionsService: PermissionsService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<PermissionDto>(
      'permission',
      context.getHandler(),
    );
    if (permission) {
      const request = context.switchToHttp().getRequest();
      const user: IJwtPayload = request.user;
      const userInfo = await this.userService.getUserInformationById(user.id);
      const permissions = _.union(
        ...userInfo.userRoles.map((role) => role.role.permissions),
      );
      if (!permissions.includes(permission.action)) {
        return false;
      }
    }
    return true;
  }
}

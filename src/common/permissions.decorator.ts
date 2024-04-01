import { SetMetadata } from '@nestjs/common';
import { PermissionDto } from './common.dto';

export const Permission = (permission: PermissionDto) => {
  return SetMetadata('permission', permission);
};

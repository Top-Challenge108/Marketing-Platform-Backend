/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

import { PermissionsController } from './permissions.controller';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}

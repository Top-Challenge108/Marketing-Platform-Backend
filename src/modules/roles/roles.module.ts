/* istanbul ignore file */
import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesSchema, ROLES_MODEL } from './schema/roles.schema';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { UserRoleSchema, USER_ROLE_MODEL } from './schema/user-role.schema';
import { UserRoleRepository } from './user-role.repository';

import { RedisModule } from '../redis/redis.module';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { PermissionsModule } from '../permissions/permissions.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    RedisModule,
    MongooseModule.forFeature([
      { name: ROLES_MODEL, schema: RolesSchema },
      { name: USER_ROLE_MODEL, schema: UserRoleSchema },
    ]),
    LanguageModule,
    forwardRef(() => PermissionsModule),
    forwardRef(() => UserModule),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesRepository,
    UserRoleRepository,
    JwtService,
    LanguageService,
  ],
  exports: [RolesService],
})
export class RolesModule {}

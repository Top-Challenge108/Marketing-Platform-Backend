/* istanbul ignore file */
import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { PermissionsModule } from '../permissions/permissions.module';
import { UserModule } from '../user/user.module';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesEntity } from './entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserRolesEntity]),
    LanguageModule,
    forwardRef(() => PermissionsModule),
    forwardRef(() => UserModule),
  ],
  controllers: [RolesController],
  providers: [RolesService, JwtService, LanguageService],
  exports: [RolesService],
})
export class RolesModule {}

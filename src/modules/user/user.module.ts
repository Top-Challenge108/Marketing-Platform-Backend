/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { AuthModule } from '../auth/auth.module';
import { LocationModule } from '../location/location.module';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { UserMapper } from './mappers/user.mapper';
import { UserTokenService } from './services/user-token.service';
import { UserTokenEntity } from './entities/user-token.entity';
const mappers = [UserMapper];

@Module({
  providers: [UserService, LanguageService, UserTokenService, ...mappers],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      UserRolesEntity,
      UserTokenEntity,
    ]),
    JwtModule,
    RolesModule,
    PermissionsModule,
    LanguageModule,
    AuthModule,
    LocationModule,
  ],
  exports: [UserService, UserTokenService],
})
export class UserModule {}

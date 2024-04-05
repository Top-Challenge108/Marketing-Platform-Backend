/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { AuthModule } from '../auth/auth.module';
import { LocationModule } from '../location/location.module';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UserService, LanguageService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    RolesModule,
    PermissionsModule,
    LanguageModule,
    AuthModule,
    LocationModule,
  ],
  exports: [UserService],
})
export class UserModule {}

/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { USER_MODEL, UserSchema } from '../user/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { LanguageModule } from '../language/language.module';
import { RedisModule } from '../redis/redis.module';
import { LanguageService } from '../language/language.service';
import { AuthModule } from '../auth/auth.module';
import { LocationModule } from '../location/location.module';

@Module({
  providers: [UserService, UserRepository, LanguageService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]),
    JwtModule,
    RolesModule,
    PermissionsModule,
    LanguageModule,
    RedisModule,
    AuthModule,
    LocationModule,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}

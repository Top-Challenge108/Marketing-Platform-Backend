/* istanbul ignore file */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsService } from './permissions.service';
import {
  PermissionsSchema,
  PERMISSIONS_MODEL,
} from './schema/permissions.schema';
import { PermissionsController } from './permissions.controller';
import { PermissionsRepository } from './permissions.repository';
import { JwtService } from '@nestjs/jwt';
import { LanguageModule } from '../language/language.module';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PERMISSIONS_MODEL, schema: PermissionsSchema },
    ]),
    RedisModule,
    LanguageModule,
    forwardRef(() => UserModule),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository, JwtService],
  exports: [PermissionsService],
})
export class PermissionsModule {}

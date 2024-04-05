import { Module, forwardRef } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PermissionsModule } from '../permissions/permissions.module';
import { UserModule } from '../user/user.module';
import { LocationEntity } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  imports: [
    TypeOrmModule.forFeature([LocationEntity]),

    PermissionsModule,
    forwardRef(() => UserModule),
  ],
  exports: [LocationService],
})
export class LocationModule {}

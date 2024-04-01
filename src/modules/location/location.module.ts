import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LOCATION_MODEL, LocationSchema } from './schemas/location.schema';
import { LocationRepository } from './location.repository';
import { LocationController } from './location.controller';
import { PermissionsModule } from '../permissions/permissions.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [LocationService, LocationRepository],
  controllers: [LocationController],
  imports: [
    MongooseModule.forFeature([
      { name: LOCATION_MODEL, schema: LocationSchema },
    ]),
    PermissionsModule,
    forwardRef(() => UserModule),
  ],
  exports: [LocationService],
})
export class LocationModule {}

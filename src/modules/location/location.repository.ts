/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationRepositoryInterface } from './interface/location.repository.interface';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { LOCATION_MODEL } from './schemas/location.schema';
import { LocationDocument } from './interface/location.schema.interface';

@Injectable()
export class LocationRepository
  extends BaseAbstractRepository<LocationDocument>
  implements LocationRepositoryInterface
{
  constructor(
    @InjectModel(LOCATION_MODEL)
    private readonly locationModel: Model<LocationDocument>,
  ) {
    super(locationModel);
  }
}

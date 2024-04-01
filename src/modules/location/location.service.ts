import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LocationRepository } from './location.repository';
import { ILocation } from './interface/location.schema.interface';
import { LocationDto } from './dto/location.dto';
import { LanguageCode, StatusCode } from 'src/common/common.constants';

@Injectable()
export class LocationService extends BaseAbstractService {
  constructor(
    i18nService: I18nService,
    private readonly locationRepository: LocationRepository,
  ) {
    super(i18nService);
  }

  async findAndCreateLocation(locationDto: LocationDto): Promise<ILocation> {
    const { placeId } = locationDto;
    const location = await this.locationRepository.findOne({
      placeId,
    });
    if (!location) {
      return this.locationRepository.create({
        ...locationDto,
        location: {
          type: 'Point',
          coordinates: locationDto.location,
        },
      });
    }
    return location;
  }

  async getLocations(): Promise<any> {
    const locations = await this.locationRepository
      .findAll()
      .select('address id placeId latitude longitude')
      .sort({ address: 1 });

    return this.formatOutputData(
      {
        key: `translate.GET_LIST_LOCATION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.GET_LIST_LOCATION_SUCCESSFULLY,
        data: locations,
      },
    );
  }

  async findLocationById(id: string): Promise<ILocation> {
    return this.locationRepository.findById(id);
  }
}

import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LocationDto } from './dto/location.dto';
import { LocationEntity } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageCode, StatusCode } from '../../common/common.constants';

@Injectable()
export class LocationService extends BaseAbstractService {
  constructor(
    i18nService: I18nService,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    super(i18nService);
  }

  async findAndCreateLocation(
    locationDto: LocationDto,
  ): Promise<LocationEntity> {
    const { placeId } = locationDto;
    const location = await this.locationRepository.findOneBy({
      placeId,
    });
    if (!location) {
      const l = this.locationRepository.create({
        ...locationDto,
        location: {
          type: 'Point',
          coordinates: locationDto.location,
        },
      });
      return this.locationRepository.save(l);
    }
    return location;
  }

  async getLocations(): Promise<any> {
    const locations = await this.locationRepository.find();

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

  async findLocationById(id: string): Promise<LocationEntity> {
    return this.locationRepository.findOneBy({ id });
  }
}

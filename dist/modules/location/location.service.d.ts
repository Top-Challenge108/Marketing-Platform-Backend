import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LocationRepository } from './location.repository';
import { ILocation } from './interface/location.schema.interface';
import { LocationDto } from './dto/location.dto';
export declare class LocationService extends BaseAbstractService {
    private readonly locationRepository;
    constructor(i18nService: I18nService, locationRepository: LocationRepository);
    findAndCreateLocation(locationDto: LocationDto): Promise<ILocation>;
    getLocations(): Promise<any>;
    findLocationById(id: string): Promise<ILocation>;
}

import { ICreateLocation } from '../interface/location.schema.interface';
export declare class LocationDto implements ICreateLocation {
    name: string;
    address: string;
    placeId: string;
    location: number[];
}

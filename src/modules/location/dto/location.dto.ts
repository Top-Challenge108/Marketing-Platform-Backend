import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ICreateLocation } from '../interface/location.schema.interface';

export class LocationDto implements ICreateLocation {
  @ApiProperty({
    example: 'White Cub',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'White Cube',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'ChIJrTLr-GyuEmsRBfy61i59si0',
  })
  @IsString()
  placeId: string;

  @ApiProperty({
    example: [105.79738939975343, 9.909455130227597],
    required: true,
  })
  @IsNumber({}, { each: true })
  location: number[];
}

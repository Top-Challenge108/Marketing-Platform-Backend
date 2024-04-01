import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';

export class EditUserInfoDto {
  @ApiProperty({
    required: true,
    example: 'Nguyen Van',
  })
  @IsString()
  @IsOptional()
  @Transform((data) => data.value?.trim())
  lastName: string;

  @ApiProperty({
    required: true,
    example: 'A',
  })
  @IsString()
  @Transform((data) => data.value?.trim())
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: '0123456789',
  })
  @IsString()
  @IsOptional()
  @Transform((data) => data.value?.trim())
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  company?: string;

  @ApiProperty({
    example: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
  })
  @IsOptional()
  @IsString()
  placeId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  website?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  bio?: string;

  locationId?: mongoose.Types.ObjectId;
}

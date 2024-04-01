import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDefined, IsString, IsEnum } from 'class-validator';
import { CommonPaginationDto } from '../../../common/pagination.dto';
import { Role, TypeStatus } from '../../../common/common.constants';
import { Type } from 'class-transformer';

export class GetUserDto extends CommonPaginationDto {
  @ApiProperty()
  @IsOptional()
  @ApiProperty({
    description: 'find with _id || email || phone and fullname',
    required: false,
  })
  keywords?: string;

  @ApiProperty({
    enum: Object.values(TypeStatus),
    required: false,
  })
  status?: string;

  @ApiProperty({
    example: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
    required: false,
  })
  @IsOptional()
  @IsString()
  placeId?: string;

  @ApiProperty({
    example: 'joinDate_asc or joinDate_desc',
    description: 'support all field',
    required: false,
  })
  sortBy?: string;

  @ApiProperty({
    required: false,
    enum: Role,
    isArray: true,
    default: [],
    example: Role.Agent,
  })
  @IsOptional()
  @IsEnum(Role, { each: true })
  role?: Role[];
}

export class exportUserCsvDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsDefined()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsDefined()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @ApiProperty({
    example: '62f49db316a173d4a99135c4',
    description: 'find with _id || email || phone and fullname',
  })
  keywords?: string;

  @ApiProperty({ enum: Object.values(TypeStatus) })
  status?: string;

  @ApiProperty({
    example: 'joinDate_asc or joinDate_desc',
    description: 'support all field',
  })
  sortBy?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';
import { CommonPaginationDto } from '../../../common/pagination.dto';
import { ActiveStatus } from '../../../common/common.constants';

export class GetRolesDto extends CommonPaginationDto {
  @ApiProperty({
    description: 'find with _id ||  name',
    required: false,
  })
  keywords?: string;

  @ApiProperty({
    enum: Object.values(ActiveStatus),
    required: false,
  })
  @IsBooleanString()
  @IsOptional()
  active?: string;

  @ApiProperty({
    example: 'name_asc',
    description: 'support id and name field',
    required: false,
    default: 'name_asc',
  })
  sortBy?: string;
}

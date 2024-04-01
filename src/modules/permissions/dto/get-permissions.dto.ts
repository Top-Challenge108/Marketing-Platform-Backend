import { ApiProperty } from '@nestjs/swagger';
import { CommonPaginationDto } from '../../../common/pagination.dto';

export class GetPermissionsDto extends CommonPaginationDto {
  @ApiProperty({
    description: 'find with action ||  description',
    required: false,
  })
  keywords?: string;

  @ApiProperty({
    example: 'createdAt_asc',
    required: false,
    default: 'createdAt_asc',
  })
  sortBy?: string;
}

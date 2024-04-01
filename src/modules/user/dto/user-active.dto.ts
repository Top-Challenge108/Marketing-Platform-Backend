import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonPaginationDto } from '../../../common/pagination.dto';

export class UserActiveDto extends CommonPaginationDto {
  @ApiProperty({ required: true })
  @IsString()
  roleId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  keywords?: string;
}

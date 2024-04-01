import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CommonPaginationDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  limit: number;

  data?: any;
  total?: number;
}

export class PaginationResDto {
  @ApiProperty({ default: 1 })
  total: number;

  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 10 })
  limit: number;
}

export class SearchSortDto extends CommonPaginationDto {
  @ApiProperty({ required: false })
  @Type(() => String)
  @IsOptional()
  keywords: string;
}

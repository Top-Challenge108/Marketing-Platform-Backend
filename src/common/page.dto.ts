import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from './page-meta.dto';
import { Type } from 'class-transformer';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @Type(() => PageMetaDto)
  readonly pagination: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.pagination = meta;
  }
}

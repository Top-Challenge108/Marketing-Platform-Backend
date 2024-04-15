import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertCategory {
  @ApiProperty()
  name: string;

  @ApiProperty()
  handle?: string;

  @ApiProperty()
  description: string;
}

export class UpsertCategoryResponse {
  @AutoMap()
  id?: string;

  @AutoMap()
  name: string;

  @AutoMap()
  handle: string;

  @AutoMap()
  description: string;

  @AutoMap()
  parentId: string;
}

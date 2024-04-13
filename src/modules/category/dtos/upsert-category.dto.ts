import { AutoMap } from '@automapper/classes';

export class UpsertCategory {
  id?: string;

  name: string;

  handle?: string;

  description: string;

  parentId?: string;
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

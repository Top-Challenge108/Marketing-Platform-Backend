import { AutoMap } from '@automapper/classes';

export class CategoryDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  icon: string;

  @AutoMap()
  handle: string;

  @AutoMap()
  description: string;
}

import { AutoMap } from '@automapper/classes';

export class ToolDto {
  @AutoMap()
  name: string;

  @AutoMap()
  shortDescription?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  website?: string;

  @AutoMap()
  logo?: string;

  @AutoMap()
  screenshots?: string[];

  @AutoMap()
  keyFeatures?: string[];

  @AutoMap()
  useCases?: string[];

  @AutoMap()
  price: number;

  //   @AutoMap()
  //   categoryId!: string;
}

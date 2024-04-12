import { AutoMap } from '@automapper/classes';

export class UpsertToolDealDto {
  @AutoMap()
  name: string;

  @AutoMap()
  descriptions?: string;

  @AutoMap()
  price: number;

  @AutoMap()
  discountPrice: number;

  @AutoMap()
  toolId!: string;
}

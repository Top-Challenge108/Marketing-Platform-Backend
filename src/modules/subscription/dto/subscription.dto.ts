import { AutoMap } from '@automapper/classes';
import { SubscriptionInterval } from '../enum/subscription.enum';

export class SubscriptionDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  price: string;

  @AutoMap()
  discountPrice: string;

  @AutoMap()
  descriptions: string;

  @AutoMap()
  interval: SubscriptionInterval;

  @AutoMap()
  currency: string;
}

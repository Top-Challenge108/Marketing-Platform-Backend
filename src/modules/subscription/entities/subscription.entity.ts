import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Currency, SubscriptionInterval } from '../enum/subscription.enum';
import { AutoMap } from '@automapper/classes';

@Entity('subscriptions')
export class SubscriptionEntity extends AbstractEntity {
  @AutoMap()
  @Column({ unique: true })
  name: string;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  price: number;

  @AutoMap()
  @Column({ default: SubscriptionInterval.Month })
  interval: SubscriptionInterval;

  @AutoMap()
  @Column({
    type: 'enum',
    nullable: false,
    default: Currency.USD,
    enum: Currency,
  })
  currency: Currency;
}

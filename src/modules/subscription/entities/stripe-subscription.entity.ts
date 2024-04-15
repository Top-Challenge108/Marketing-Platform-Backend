import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Currency } from '../enum/subscription.enum';
import { AutoMap } from '@automapper/classes';

@Entity('stripe_subscriptions')
export class StripeSubscriptionEntity extends AbstractEntity {
  @AutoMap()
  @Column({ unique: true })
  name: string;

  @AutoMap()
  @Column({ nullable: false })
  stripeSubscriptionId: string;

  @AutoMap()
  @Column({
    type: 'enum',
    nullable: false,
    default: Currency.USD,
    enum: Currency,
  })
  currency: Currency;

  @AutoMap()
  @Column({ nullable: false, default: 0 })
  price: number;

  @AutoMap()
  @Column({ nullable: false })
  currentPeriodEnd: number;

  @AutoMap()
  @Column({ nullable: false })
  currentPeriodStart: number;

  @AutoMap()
  @Column({ nullable: false })
  startDate: number;

  @AutoMap()
  @Column({ nullable: false })
  status: string;
}

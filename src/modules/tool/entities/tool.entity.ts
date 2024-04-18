import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { AutoMap } from '@automapper/classes';
import { ToolDealEntity } from './tool-deal.entity';
import { StripeSubscriptionEntity } from '../../subscription/entities/stripe-subscription.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';

export enum ToolStatus {
  pending = 'pending',
  published = 'published',
}

@Entity('tools')
export class ToolEntity extends AbstractEntity {
  @AutoMap()
  @Column({ unique: true, nullable: false })
  name: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  shortDescription?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: false })
  website?: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  logo?: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  logoId: string;

  @AutoMap()
  @Column({ type: 'simple-array', default: [] })
  screenshotId: string[];

  @AutoMap()
  @Column({ type: 'simple-array', default: [] })
  screenshots?: string[];

  @AutoMap()
  @Column({ type: 'simple-array' })
  keyFeatures?: string[];

  @AutoMap()
  @Column({ type: 'simple-array' })
  useCases?: string[];

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
  @Column({ type: 'uuid' })
  categoryId!: string;

  @AutoMap()
  @Column({ type: 'enum', enum: ToolStatus, default: ToolStatus.pending })
  status: ToolStatus;

  @AutoMap(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @AutoMap(() => [ToolDealEntity])
  @OneToMany(() => ToolDealEntity, (toolDeal) => toolDeal.tool, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  toolDeals: ToolDealEntity[];

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  stripeSubscriptionId: string;

  @AutoMap(() => StripeSubscriptionEntity)
  @OneToOne(() => StripeSubscriptionEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'stripe_subscription_id' })
  stripeSubscription: StripeSubscriptionEntity;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;
}

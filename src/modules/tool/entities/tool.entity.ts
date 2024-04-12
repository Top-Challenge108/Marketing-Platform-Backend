import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { AutoMap } from '@automapper/classes';
import { ToolDealEntity } from './tool-deal.entity';

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
  @Column({ type: 'varchar', nullable: false })
  logo?: string;

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
  @Column({ nullable: false, default: 0 })
  price: number;

  @AutoMap()
  @Column({ type: 'uuid' })
  categoryId!: string;

  @OneToMany(() => ToolDealEntity, (toolDeal) => toolDeal.tool, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  toolDeals: ToolDealEntity[];
}

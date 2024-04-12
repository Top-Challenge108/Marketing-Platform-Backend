import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { AutoMap } from '@automapper/classes';
import { ToolEntity } from './tool.entity';

@Entity('tool_deals')
export class ToolDealEntity extends AbstractEntity {
  @AutoMap()
  @Column({ nullable: false })
  name: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  descriptions?: string;

  @AutoMap()
  @Column({ nullable: false, default: 0 })
  price: number;

  @AutoMap()
  @Column({ nullable: false, default: 0 })
  discountPrice: number;

  @AutoMap()
  @Column({ type: 'uuid' })
  toolId!: string;

  @ManyToOne(() => ToolEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tool_id' })
  tool!: ToolEntity;
}

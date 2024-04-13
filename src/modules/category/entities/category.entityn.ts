import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';
import { AbstractEntity } from '../../../common/entities/abstract.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true, default: null })
  handle: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}

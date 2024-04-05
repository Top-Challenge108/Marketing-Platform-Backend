import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { AutoMap } from '@automapper/classes';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('locations')
export class LocationEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: false })
  placeId: string;

  @Column({ type: 'jsonb' })
  location: { type: string; coordinates: number[] };

  @AutoMap()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}

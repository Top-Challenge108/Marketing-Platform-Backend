import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';

@Entity('permissions')
export class PermissionEntity extends AbstractEntity {
  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;
}

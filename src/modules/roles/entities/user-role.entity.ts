import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { RoleEntity } from './role.entity';

@Entity('user_roles')
export class UserRolesEntity extends AbstractEntity {
  @Column({ name: 'user_id' })
  userId: string;
  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'role_id' })
  roleId: string;
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}

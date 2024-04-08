import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'user_tokens',
})
export class UserTokenEntity extends AbstractEntity {
  @Column({ type: 'boolean' })
  isRevoked: boolean;

  @Column({ type: 'timestamp' })
  expiredDate: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

import { Entity, Column, VirtualColumn, OneToMany } from 'typeorm';
import { TypeStatus, LanguageCode } from '../../../common/common.constants';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { LocationEntity } from '../../location/entities/location.entity';
import { UserRolesEntity } from '../../roles/entities/user-role.entity';
import { AutoMap } from '@automapper/classes';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @AutoMap()
  @Column({ nullable: true, unique: true })
  email: string;

  @AutoMap()
  @Column({ nullable: true, default: null })
  avatar: string;

  @AutoMap()
  @Column({ nullable: true, default: null })
  password: string;

  @AutoMap()
  @Column({ default: '' })
  firstName: string;

  @AutoMap()
  @Column({ default: '' })
  lastName: string;

  @AutoMap()
  @Column({ nullable: true, unique: true })
  phone: string;

  @AutoMap()
  @Column({ enum: Object.values(TypeStatus), default: TypeStatus.ACTIVE })
  status: string;

  @AutoMap()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  joinDate: Date;

  @AutoMap()
  @Column({ nullable: true, default: null })
  dob: Date;

  @AutoMap()
  @Column({ default: null })
  citizenship: string;

  @AutoMap()
  @Column({ default: null })
  gender: string;

  @AutoMap()
  @Column()
  salt: string;

  @AutoMap()
  @Column({ nullable: true })
  lastUpdatePassword: Date;

  @AutoMap()
  @Column({ enum: LanguageCode })
  language: string;

  @AutoMap()
  @Column({ nullable: true, default: null })
  website: string;

  @AutoMap()
  @Column({ nullable: true, default: null })
  bio: string;

  @AutoMap()
  @Column({ nullable: true, default: null })
  company: string;

  @AutoMap()
  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
  })
  fullName: string;

  @OneToMany(() => LocationEntity, (entity) => entity.user, {
    nullable: true,
    cascade: true,
  })
  locations: LocationEntity[];

  @OneToMany(() => UserRolesEntity, (role) => role.user, {
    nullable: true,
    cascade: true,
  })
  userRoles: UserRolesEntity[];
}

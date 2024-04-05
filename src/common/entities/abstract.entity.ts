import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @AutoMap()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date | undefined;
}

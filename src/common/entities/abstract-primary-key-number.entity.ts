import { AutoMap } from '@automapper/classes';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractPrimaryKeyNumberEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
  })
  @AutoMap()
  id: number;
}

import { AutoMap } from '@automapper/classes';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractPrimaryKeyUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;
}

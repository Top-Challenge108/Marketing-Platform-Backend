import { AutoMap } from '@automapper/classes';
import { ViewColumn } from 'typeorm';

export abstract class AbstractViewEntity {
  @AutoMap()
  @ViewColumn()
  id!: string;

  @AutoMap()
  @ViewColumn()
  createdAt!: Date;

  @AutoMap()
  @ViewColumn()
  updatedAt!: Date;
}

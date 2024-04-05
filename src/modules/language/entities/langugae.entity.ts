import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';

@Entity('languages')
export class LanguageEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  icon: string;
}

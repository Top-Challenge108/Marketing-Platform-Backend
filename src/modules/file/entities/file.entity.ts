import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';

@Entity({ name: 'files' })
export class FileEntity extends AbstractEntity {
  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  publicId: string;

  @AutoMap()
  @Column({ nullable: true })
  version: number;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  signature: string;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 9,
    scale: 4,
    default: null,
    nullable: true,
  })
  width: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 9,
    scale: 4,
    default: null,
    nullable: true,
  })
  height: number;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  format: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  resourceType: string;

  @AutoMap()
  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @AutoMap()
  @Column({ nullable: true })
  pages: number;

  @AutoMap()
  @Column({ nullable: true })
  bytes: number;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  type: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  etag: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  placeholder: boolean;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  url: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  secureUrl: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  accessMode: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  originalFilename: string;

  @AutoMap()
  @Column({ type: 'simple-array', default: [] })
  moderation: string[];

  @AutoMap()
  @Column({ type: 'simple-array', default: [] })
  accessControl: string[];
}

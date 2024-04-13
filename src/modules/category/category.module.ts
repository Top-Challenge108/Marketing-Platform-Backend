import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entityn';
import { CategoryMapper } from './mappers/category.mapper';

const mappers = [CategoryMapper];

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, ...mappers],
  controllers: [CategoryController],
})
export class CategoryModule {}

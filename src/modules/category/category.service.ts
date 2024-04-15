import { Mapper } from '@automapper/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryDto } from './dtos/category.dto';
import {
  type UpsertCategory,
  UpsertCategoryResponse,
} from './dtos/upsert-category.dto';
import { InjectMapper } from '@automapper/nestjs';
import { CategoryEntity } from './entities/category.entity';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getList(): Promise<CategoryDto[]> {
    const result = await this.categoryRepository.find();

    return this.mapper.mapArray(result, CategoryEntity, CategoryDto);
  }

  async update(
    id: string,
    dto: UpsertCategory,
  ): Promise<UpsertCategoryResponse> {
    const entity = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    const result = await this.categoryRepository.save({
      id,
      ...dto,
    });

    return this.mapper.map(result, CategoryEntity, UpsertCategoryResponse);
  }

  async insert(
    dto: UpsertCategory,
    user: IJwtPayload,
  ): Promise<UpsertCategoryResponse> {
    const entity = this.categoryRepository.create({
      ...dto,
      userId: user.id,
    });

    const result = await this.categoryRepository.save(entity);

    return this.mapper.map(result, CategoryEntity, UpsertCategoryResponse);
  }

  async delete(id: string): Promise<CategoryEntity> {
    const entity = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return this.categoryRepository.softRemove(entity);
  }
}

import {
  createMap,
  type Mapper,
  type MappingConfiguration,
  type MappingProfile,
  typeConverter,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CategoryDto } from '../dtos/category.dto';
import { UpsertCategoryResponse } from '../dtos/upsert-category.dto';
import { CategoryEntity } from '../entities/category.entityn';

@Injectable()
export class CategoryMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, CategoryEntity, UpsertCategoryResponse);
      createMap(mapper, CategoryEntity, CategoryDto);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [typeConverter(String, Number, (str) => Number.parseInt(str, 10))];
  }
}

import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserEntity } from '../user/entities/user.entity';
import { CategoryService } from './category.service';
import {
  UpsertCategory,
  type UpsertCategoryResponse,
} from './dtos/upsert-category.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

//   @Get()
//   async getList() {
//     return this.categoryService.getList(format);
//   }

//   @Post()
//   async upsert(
//     @Body() dto: UpsertCategory,
//   ): Promise<UpsertCategoryResponse> {
//     if (dto.id) {
//       return this.categoryService.update(dto);
//     }

//     return this.categoryService.insert(dto, user);
//   }

//   @Delete(':id')
//   async delete(@UUIDParam('id') id: Uuid) {
//     return this.categoryService.delete(id);
//   }
}

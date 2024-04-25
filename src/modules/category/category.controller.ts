import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CategoryService } from './category.service';
import {
  UpsertCategory,
  type UpsertCategoryResponse,
} from './dtos/upsert-category.dto';
import { PermissionActions } from '../../common/common.constants';
import { Permission } from '../../common/permissions.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import { ApiFile } from '../../common/swagger.decorator';
import { IFile } from '../../interfaces/file.interface';

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('list')
  async getList() {
    return this.categoryService.getList();
  }

  @Get('info/:handle')
  async getByName(@Param('handle') handle: string) {
    return this.categoryService.getOneByHandle(handle);
  }

  @Get('info-by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getOneById(id);
  }

  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.CREATE_CATEGORY,
    description: PermissionActions.CREATE_CATEGORY,
  })
  @ApiFile({ name: 'avatar' })
  async create(
    @Body() dto: UpsertCategory,
    @Req() req: Request,
    @UploadedFile() file?: IFile,
  ): Promise<UpsertCategoryResponse> {
    console.log('====================================');
    console.log('file', file);
    console.log('====================================');
    return this.categoryService.insert(dto, <IJwtPayload>req.user, file);
  }

  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.CREATE_CATEGORY,
    description: PermissionActions.CREATE_CATEGORY,
  })
  async update(
    @Param(':id') id: string,
    @Body() dto: UpsertCategory,
  ): Promise<UpsertCategoryResponse> {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.DELETE_CATEGORY,
    description: PermissionActions.DELETE_CATEGORY,
  })
  async delete(@Param(':id') id: string) {
    return this.categoryService.delete(id);
  }
}

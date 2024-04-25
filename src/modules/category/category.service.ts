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
import { IFile } from '../../interfaces/file.interface';
import { CloudinaryService } from '../integration/services/cloudinary.service';
import { FileEntity } from '../file/entities/file.entity';
import { LanguageCode, StatusCode } from '../../common/common.constants';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CategoryService extends BaseAbstractService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly i18nService: I18nService,
  ) {
    super(i18nService);
  }

  async getList() {
    const result = await this.categoryRepository.find();

    const res = this.mapper.mapArray(result, CategoryEntity, CategoryDto);
    return this.formatOutputData(
      {
        key: `translate.GET_CATEGORY_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.GET_CATEGORY_SUCCESSFULLY,
        data: res,
      },
    );
  }

  async getOneByHandle(handle) {
    const result = await this.categoryRepository.findOne({
      where: [{ handle: `${handle}` }, { handle: `/${handle}` }],
    });

    const res = this.mapper.map(result, CategoryEntity, CategoryDto);
    return this.formatOutputData(
      {
        key: `translate.GET_CATEGORY_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.GET_CATEGORY_SUCCESSFULLY,
        data: res,
      },
    );
  }

  async getOneById(id) {
    const result = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    const res = this.mapper.map(result, CategoryEntity, CategoryDto);
    return this.formatOutputData(
      {
        key: `translate.GET_CATEGORY_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.GET_CATEGORY_SUCCESSFULLY,
        data: res,
      },
    );
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
    avatar?: IFile,
  ): Promise<UpsertCategoryResponse> {
    let avatarEntity: FileEntity;
    if (avatar) {
      const uploadedLogo = await this.cloudinaryService.uploadImage(avatar);
      const logoObj = this.fileRepository.create({
        publicId: uploadedLogo.public_id,
        version: uploadedLogo.version,
        signature: uploadedLogo.signature,
        width: uploadedLogo.width,
        height: uploadedLogo.height,
        format: uploadedLogo.format,
        resourceType: uploadedLogo.resource_type,
        tags: uploadedLogo.tags,
        pages: uploadedLogo.pages,
        bytes: uploadedLogo.bytes,
        type: uploadedLogo.type,
        etag: uploadedLogo.etag,
        placeholder: uploadedLogo.placeholder,
        url: uploadedLogo.url,
        secureUrl: uploadedLogo.url,
        accessMode: uploadedLogo.access_mode,
        originalFilename: uploadedLogo.original_filename,
        moderation: uploadedLogo.moderation,
        accessControl: uploadedLogo.access_control,
      });
      avatarEntity = await this.fileRepository.save(logoObj);
    }
    const entity = this.categoryRepository.create({
      ...dto,
      userId: user.id,
      icon: avatarEntity ? avatarEntity.url : null,
      iconId: avatarEntity ? avatarEntity.id : null,
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

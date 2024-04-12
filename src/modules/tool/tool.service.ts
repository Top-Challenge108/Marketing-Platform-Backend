import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ToolEntity } from './entities/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertToolDto } from './dto/upsert-tool.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ToolDto } from './dto/tool.dto';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { I18nService } from 'nestjs-i18n';
import { LanguageCode, StatusCode } from '../../common/common.constants';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import { Transactional } from 'typeorm-transactional';
import { ToolDealEntity } from './entities/tool-deal.entity';

@Injectable()
export class ToolService extends BaseAbstractService {
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolRepository: Repository<ToolEntity>,
    @InjectRepository(ToolDealEntity)
    private readonly toolDealRepository: Repository<ToolDealEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
    i18nService: I18nService,
  ) {
    super(i18nService);
  }

  async getList() {
    const sub = await this.toolRepository.find();
    return this.formatOutputData(
      {
        key: `translate.GET_LIST_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: this.mapper.mapArray(sub, ToolEntity, ToolDto),
        statusCode: StatusCode.GET_LIST_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }

  @Transactional()
  async create(dto: UpsertToolDto) {
    const deals = this.toolDealRepository.create(dto.toolDeals);
    const tools = this.toolRepository.create({
      ...dto,
      logo: '',
      categoryId: 'd7915760-b56e-41b6-9472-417c2251a1a1',
      toolDeals: deals,
    });

    const result = this.mapper.map(
      await this.toolRepository.save(tools),
      ToolEntity,
      ToolDto,
    );

    return this.formatOutputData(
      {
        key: `translate.CREATE_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: result,
        statusCode: StatusCode.CREATE_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }

  async delete(id: string, jwtPayload: IJwtPayload) {
    const sub = await this.toolRepository.findOneBy({ id });

    if (!sub) {
      const result = await this.formatOutputData(
        {
          key: `translate.SUBSCRIPTION_NOT_FOUND`,
          lang: jwtPayload.language,
        },
        {
          data: null,
          statusCode: StatusCode.SUBSCRIPTION_NOT_FOUND,
        },
      );

      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }
    await this.toolRepository.save(sub);

    return this.formatOutputData(
      {
        key: `translate.DELETE_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: {},
        statusCode: StatusCode.DELETE_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }
}

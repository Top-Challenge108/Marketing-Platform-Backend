import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertSubscriptionDto } from './dto/upsert-subscription.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SubscriptionDto } from './dto/subscription.dto';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { I18nService } from 'nestjs-i18n';
import { LanguageCode, StatusCode } from '../../common/common.constants';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';

@Injectable()
export class SubscriptionService extends BaseAbstractService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
    i18nService: I18nService,
  ) {
    super(i18nService);
  }

  async getList() {
    const sub = await this.subscriptionRepository.find();
    return this.formatOutputData(
      {
        key: `translate.GET_LIST_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: this.mapper.mapArray(sub, SubscriptionEntity, SubscriptionDto),
        statusCode: StatusCode.GET_LIST_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }

  async create(dto: UpsertSubscriptionDto) {
    const sub = this.subscriptionRepository.create(dto);

    const result = this.mapper.map(
      await this.subscriptionRepository.save(sub),
      SubscriptionEntity,
      SubscriptionDto,
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
    const sub = await this.subscriptionRepository.findOneBy({ id });

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
    await this.subscriptionRepository.save(sub);

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

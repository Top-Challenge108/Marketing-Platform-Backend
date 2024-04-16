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
import { CategoryEntity } from '../category/entities/category.entity';
import { SubscriptionEntity } from '../subscription/entities/subscription.entity';
import { StripeSubscriptionEntity } from '../subscription/entities/stripe-subscription.entity';
import { StripeSubscriptionService } from '../integration/services/stripe-subscription.service';
import { stripeConfig } from '../../configs/configs.constants';
import { SubmitToolDto } from './dto/submit-tool.dto';

@Injectable()
export class ToolService extends BaseAbstractService {
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolRepository: Repository<ToolEntity>,
    @InjectRepository(ToolDealEntity)
    private readonly toolDealRepository: Repository<ToolDealEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(StripeSubscriptionEntity)
    private readonly stripeSubscriptionRepository: Repository<StripeSubscriptionEntity>,
    private readonly stripeSubscriptionService: StripeSubscriptionService,
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
    const existedTool = await this.toolRepository.findOneBy({ name: dto.name });
    if (existedTool) {
      const result = await this.formatOutputData(
        {
          key: `translate.TOOL_ALREADY_EXISTED`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.TOOL_ALREADY_EXISTED,
        },
      );
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    const deals = this.toolDealRepository.create(dto.toolDeals);
    const category = await this.categoryRepository.findOneBy({
      id: dto.categoryId,
    });
    if (!category) {
      const result = await this.formatOutputData(
        {
          key: `translate.CATEGORY_NOT_FOUND`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.CATEGORY_NOT_FOUND,
        },
      );
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    const subscriptions = await this.subscriptionRepository.findOneBy({
      id: dto.subscriptionId,
    });
    if (!subscriptions) {
      const result = await this.formatOutputData(
        {
          key: `translate.SUBSCRIPTION_NOT_FOUND`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.SUBSCRIPTION_NOT_FOUND,
        },
      );
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    const tool = this.toolRepository.create({
      ...dto,
      logo: '',
      category,
      toolDeals: deals,
    });

    const toolEntity = await this.toolRepository.save(tool);

    const { session: stripeSession } =
      await this.stripeSubscriptionService.createStripeSubscriptionPayment({
        amount: subscriptions.price,
        productId: toolEntity.id,
        productName: toolEntity.name,
        recursionPlan: subscriptions.interval,
        currency: subscriptions.currency,
        callbackSuccessUrl: `${stripeConfig.FRONTEND_URL}/success`,
        callbackFailureUrl: `${stripeConfig.FRONTEND_URL}/cancel`,
      });

    if (!stripeSession) {
      const result = await this.formatOutputData(
        {
          key: `translate.CANNOT_SUBMIT_TOOL_NOW`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.CANNOT_SUBMIT_TOOL_NOW,
        },
      );
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    const toolInfo = this.mapper.map(toolEntity, ToolEntity, ToolDto);

    const result: SubmitToolDto = {
      tool: toolInfo,
      checkoutUrl: stripeSession?.url,
    };

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

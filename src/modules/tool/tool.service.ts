import { CloudinaryService } from './../integration/services/cloudinary.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ToolEntity, ToolStatus } from './entities/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadMediaToolDto, UpsertToolDto } from './dto/upsert-tool.dto';
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
import { FileEntity } from '../file/entities/file.entity';
import { PageOptionsDto } from '../../common/page-options.dto';
import { PageMetaDto } from '../../common/page-meta.dto';
import { PageDto } from '../../common/page.dto';
import { FilterToolPageOptionsDto } from './dto/filter-tool.dto';

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
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly stripeSubscriptionService: StripeSubscriptionService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectMapper()
    private readonly mapper: Mapper,
    i18nService: I18nService,
  ) {
    super(i18nService);
  }

  async filterTool(filter: FilterToolPageOptionsDto) {
    const query = this.toolRepository
      .createQueryBuilder('tools')
      .where('tools.status = :status', { status: ToolStatus.published });
    if (filter.categoryId) {
      query.where('tools.category_id = :categoryId', {
        categoryId: filter.categoryId,
      });
    }

    query.leftJoinAndSelect('tools.author', 'author');

    if (filter.sort) {
      query.orderBy(`tools.${filter.sort}`, filter.order);
    }

    const itemCount = await query.getCount();
    const tools = await query.skip(filter.skip).take(filter.take).getMany();

    const data = this.mapper.mapArray(tools, ToolEntity, ToolDto);

    const result = new PageDto(
      data,
      new PageMetaDto({
        pageOptionsDto: filter,
        itemCount,
      }),
    );

    return this.formatOutputData(
      {
        key: `translate.GET_LIST_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: result,
        statusCode: StatusCode.GET_LIST_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }

  async getList(filter: PageOptionsDto, jwtPayload: IJwtPayload) {
    const toolsQuery = this.toolRepository
      .createQueryBuilder('tools')
      .where(`tools.user_id = :userId`, {
        userId: jwtPayload.id,
      })
      .orderBy('created_at', filter.order);

    const itemCount = await toolsQuery.getCount();
    const tools = await toolsQuery
      .skip(filter.skip)
      .take(filter.take)
      .getMany();

    const data = this.mapper.mapArray(tools, ToolEntity, ToolDto);

    const result = new PageDto(
      data,
      new PageMetaDto({
        pageOptionsDto: filter,
        itemCount,
      }),
    );

    return this.formatOutputData(
      {
        key: `translate.GET_LIST_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: result,
        statusCode: StatusCode.GET_LIST_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }

  @Transactional()
  async create(
    dto: UpsertToolDto,
    media: UploadMediaToolDto,
    jwtPayload: IJwtPayload,
  ) {
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
    let logoEntity: FileEntity = null;
    let screenshots: FileEntity[] = [];
    try {
      const uploadedLogo = await this.cloudinaryService.uploadImage(media.logo);
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
      logoEntity = await this.fileRepository.save(logoObj);

      const uploadingScreenshots = media.screenshots.map((screenshot) => {
        return this.cloudinaryService.uploadImage(screenshot);
      });
      const uploadedScreenshots = await Promise.all(uploadingScreenshots);
      const screenshotsObjs = uploadedScreenshots.map((screenshot) => {
        return this.fileRepository.create({
          publicId: screenshot.public_id,
          version: screenshot.version,
          signature: screenshot.signature,
          width: screenshot.width,
          height: screenshot.height,
          format: screenshot.format,
          resourceType: screenshot.resource_type,
          tags: screenshot.tags,
          pages: screenshot.pages,
          bytes: screenshot.bytes,
          type: screenshot.type,
          etag: screenshot.etag,
          placeholder: screenshot.placeholder,
          url: screenshot.url,
          secureUrl: screenshot.url,
          accessMode: screenshot.access_mode,
          originalFilename: screenshot.original_filename,
          moderation: screenshot.moderation,
          accessControl: screenshot.access_control,
        });
      });

      screenshots = await this.fileRepository.save(screenshotsObjs);
    } catch (error) {
      const result = await this.formatOutputData(
        {
          key: `translate.MEDIA_SERVICE_ERROR`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.MEDIA_SERVICE_ERROR,
        },
      );
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const tool = this.toolRepository.create({
      ...dto,
      logo: logoEntity?.url,
      logoId: logoEntity?.id,
      screenshots: screenshots.map((screenshot) => screenshot.url),
      screenshotId: screenshots.map((screenshot) => screenshot.id),
      category,
      toolDeals: deals,
      userId: jwtPayload.id,
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
    const tool = await this.toolRepository.findOneBy({
      id,
      userId: jwtPayload.id,
    });

    if (!tool) {
      const result = await this.formatOutputData(
        {
          key: `translate.TOOL_NOT_FOUND`,
          lang: jwtPayload.language,
        },
        {
          data: null,
          statusCode: StatusCode.TOOL_NOT_FOUND,
        },
      );

      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }
    const result = await this.toolRepository.softRemove(tool);

    return this.formatOutputData(
      {
        key: `translate.DELETE_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: this.mapper.map(result, ToolEntity, ToolDto),
        statusCode: StatusCode.DELETE_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }

  async publish(id: string, jwtPayload: IJwtPayload) {
    const tool = await this.toolRepository.findOneBy({
      id,
      userId: jwtPayload.id,
      status: ToolStatus.pending,
    });

    if (!tool) {
      const result = await this.formatOutputData(
        {
          key: `translate.TOOL_NOT_FOUND`,
          lang: jwtPayload.language,
        },
        {
          data: null,
          statusCode: StatusCode.TOOL_NOT_FOUND,
        },
      );

      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }
    tool.status = ToolStatus.published;
    const result = await this.toolRepository.save(tool);

    return this.formatOutputData(
      {
        key: `translate.PUBLISH_SUBSCRIPTION_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        data: this.mapper.map(result, ToolEntity, ToolDto),
        statusCode: StatusCode.PUBLISH_SUBSCRIPTION_SUCCESSFULLY,
      },
    );
  }
}

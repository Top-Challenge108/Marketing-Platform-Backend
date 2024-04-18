import {
  createMap,
  type Mapper,
  type MappingConfiguration,
  type MappingProfile,
  typeConverter,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ToolEntity } from '../entities/tool.entity';
import { ToolDto } from '../dto/tool.dto';
import { UpsertToolDealDto } from '../dto/upsert-tool-deal.dto';
import { ToolDealEntity } from '../entities/tool-deal.entity';
import { ToolDealDto } from '../dto/tool-deal.dto';

@Injectable()
export class ToolMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        ToolEntity,
        ToolDto,
        forMember(
          (destination) => destination.screenshots,
          mapFrom((source) => source.screenshots),
        ),
        forMember(
          (destination) => destination.keyFeatures,
          mapFrom((source) => source.keyFeatures),
        ),
        forMember(
          (destination) => destination.useCases,
          mapFrom((source) => source.useCases),
        ),
      );
      createMap(mapper, UpsertToolDealDto, ToolDealEntity);
      createMap(mapper, ToolDealEntity, ToolDealDto);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [typeConverter(String, Number, (str) => Number.parseInt(str, 10))];
  }
}

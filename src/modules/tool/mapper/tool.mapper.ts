import {
  createMap,
  type Mapper,
  type MappingConfiguration,
  type MappingProfile,
  typeConverter,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ToolEntity } from '../entities/tool.entity';
import { ToolDto } from '../dto/tool.dto';
import { UpsertToolDealDto } from '../dto/upsert-tool-deal.dto';
import { ToolDealEntity } from '../entities/tool-deal.entity';

@Injectable()
export class ToolMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ToolEntity, ToolDto);
      createMap(mapper, UpsertToolDealDto, ToolDealEntity);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [typeConverter(String, Number, (str) => Number.parseInt(str, 10))];
  }
}

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
import { UserEntity } from '../../user/entities/user.entity';
import { AuthorDto } from '../dto/author.dto';

@Injectable()
export class ToolMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, UserEntity, AuthorDto);
      createMap(mapper, AuthorDto, UserEntity);
      createMap(mapper, ToolDealEntity, ToolDealDto);
      createMap(mapper, ToolDealDto, ToolDealEntity);
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
        forMember(
          (destination) => destination.author,
          mapFrom((source) => {
            return mapper.map(source.author, UserEntity, AuthorDto);
          }),
        ),
      );
      createMap(mapper, UpsertToolDealDto, ToolDealEntity);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [typeConverter(String, Number, (str) => Number.parseInt(str, 10))];
  }
}

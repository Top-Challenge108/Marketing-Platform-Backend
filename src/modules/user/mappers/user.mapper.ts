import {
  createMap,
  type Mapper,
  type MappingConfiguration,
  type MappingProfile,
  typeConverter,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, UserEntity, UserDto);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [typeConverter(String, Number, (str) => Number.parseInt(str, 10))];
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class IdsDto {
  @ApiProperty()
  ids: string[];
}

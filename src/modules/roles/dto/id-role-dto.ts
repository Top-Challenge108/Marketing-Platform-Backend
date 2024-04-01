import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IDRoleDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IDDto {
  @IsMongoId()
  @ApiProperty()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBooleanString } from 'class-validator';
import { IRoles } from '../roles.interface';

export class ResponseRolesDto implements IRoles {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 'true' })
  @IsBooleanString()
  active?: string;

  @ApiProperty()
  permissions: string[];
}

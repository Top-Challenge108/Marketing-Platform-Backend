import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { IPermissions } from '../permissions.interface';

export class ResponsePermissionsDto implements IPermissions {
  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}

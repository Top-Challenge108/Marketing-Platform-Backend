import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
} from 'class-validator';
import { PermissionActions, Role } from '../../../common/common.constants';

export class CreateRolesDto {
  @ApiProperty({
    required: true,
    enum: Role,
    default: Role.Agent,
    example: Role.Agent,
  })
  @IsEnum(Role)
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the role',
    default: true,
    example: true,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'List id of permissions actions',
    example: [PermissionActions.EXPORT_USER_LIST],
  })
  @IsArray()
  permissions: string[];
}

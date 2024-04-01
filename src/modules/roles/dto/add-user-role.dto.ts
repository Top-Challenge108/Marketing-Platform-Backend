import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class AddUserRoleDto {
  @ApiProperty()
  @IsArray()
  userIds: string[];

  @ApiProperty()
  @IsString()
  roleId: string;
}

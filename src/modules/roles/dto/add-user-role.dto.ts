import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddUserRoleDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  roleId: string;
}

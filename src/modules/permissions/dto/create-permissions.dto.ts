import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePermissionsDto {
  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}

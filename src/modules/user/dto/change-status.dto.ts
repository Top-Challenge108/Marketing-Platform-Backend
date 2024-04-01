import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeStatus } from '../../../common/common.constants';

export class ChangeStatusDto {
  @ApiProperty({ default: TypeStatus.DEACTIVATED })
  @IsOptional()
  @IsEnum(TypeStatus)
  status: TypeStatus;
}

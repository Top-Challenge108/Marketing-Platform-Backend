import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { LanguageCode } from './common.constants';
import { CommonPaginationDto } from './pagination.dto';

export class ResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 1000 })
  statusCode: number;
}

export class HeaderDto {
  @ApiProperty({
    example: LanguageCode.United_States,
    required: false,
    default: LanguageCode.United_States,
  })
  @IsEnum(LanguageCode)
  lang?: LanguageCode;
}

export class PermissionDto {
  action: string;
  description?: string;
}

export class QueryCommonDto extends CommonPaginationDto {
  @ApiProperty()
  sortBy: string;
}

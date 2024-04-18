import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from '../../../common/page-options.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FilterToolPageOptionsDto extends PageOptionsDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString()
  categoryId: string;
}

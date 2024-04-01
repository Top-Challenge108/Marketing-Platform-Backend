import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PutObjectDto {
  @ApiProperty({
    required: true,
    example: 'test.jpg',
  })
  @IsString()
  @Transform((data) => data.value?.trim())
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({
    required: true,
    example: 'rcd',
    default: 'r',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(8)
  @Transform((data) => data.value?.trim())
  @IsNotEmpty()
  permissions: string;
}

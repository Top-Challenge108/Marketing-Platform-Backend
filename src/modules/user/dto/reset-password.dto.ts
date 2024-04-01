import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsBase64()
  password: string;

  @ApiProperty()
  @IsString()
  @IsBase64()
  rePassword: string;
}

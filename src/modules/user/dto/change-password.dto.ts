import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  deviceId: string;

  @ApiProperty()
  @IsString()
  @IsBase64()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsBase64()
  newPassword: string;
}

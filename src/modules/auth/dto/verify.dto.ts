import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto {
  @ApiProperty({
    example: '0123456789',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  deviceId: string;
}

export class VerifyForgotDto {
  @ApiProperty({
    example: '0123456789',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class VerifyEmailDto {
  @ApiProperty()
  @IsString()
  deviceId: string;
}

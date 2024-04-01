import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponseDto } from '../../../modules/user/dto/user-response.dto';

class UserInfoDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class ResponseLoginDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: UserInfoDto })
  result: object;

  @ApiProperty({ example: 200 })
  statusCode: number;
}

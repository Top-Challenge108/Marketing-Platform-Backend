import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

class UserInfoDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

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

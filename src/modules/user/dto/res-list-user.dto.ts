import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '../../../common/common.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserListDto extends ResponseDto {
  @ApiProperty()
  result: {
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    message: string;
  };
}

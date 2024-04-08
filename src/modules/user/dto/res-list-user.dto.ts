import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '../../../common/common.dto';
import { UserDto } from './user.dto';

export class UserListDto extends ResponseDto {
  @ApiProperty()
  result: {
    data: UserDto[];
    total: number;
    page: number;
    limit: number;
    message: string;
  };
}

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @AutoMap()
  @ApiProperty()
  phone: string;

  @AutoMap()
  @ApiProperty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  dob: Date;

  @AutoMap()
  @ApiProperty()
  citizenship: string;

  @AutoMap()
  @ApiProperty()
  gender: string;

  @AutoMap()
  @ApiProperty()
  type: string;

  @AutoMap()
  @ApiProperty()
  permissions: string[];
}

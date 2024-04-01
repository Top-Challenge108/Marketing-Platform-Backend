import { ApiProperty } from '@nestjs/swagger';
export class UserResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  citizenship: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  type: string;

  // @ApiProperty({ type: [ResponseRolesDto] })
  // roles: ResponseRolesDto[];

  @ApiProperty()
  permissions: string[];
}

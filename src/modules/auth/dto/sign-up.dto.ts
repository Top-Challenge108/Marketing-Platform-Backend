import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  Matches,
  IsString,
  IsEnum,
  IsBase64,
  MinLength,
  IsDefined,
  NotEquals,
} from 'class-validator';
import { ResponseDto } from '../../../common/common.dto';
import { Role } from '../../../common/common.constants';

export class SignUpDto {
  @ApiProperty({
    example: 'girs@gmail.com',
  })
  @IsString()
  @Transform((data) => data.value?.trim().toLowerCase())
  @Matches(
    /^([^@\s\."'<>\(\)\[\]\{\}\\/,:;]+\.)*[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+@[^@\s\._"'<>\(\)\[\]\{\}\\/,:;]+(\.[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+)+$/m,
    {
      message: 'This must be an email',
    },
  )
  email: string;

  @ApiProperty({
    example: '0123456789',
  })
  @IsString()
  @Transform((data) => data.value?.trim())
  phone: string;

  @ApiProperty({
    example: 'c3RyaW5n',
  })
  @IsBase64({
    // message: 'Password must be encrypt.',
  })
  @IsString()
  @MinLength(1)
  @IsDefined()
  @NotEquals(null)
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({
    required: true,
    enum: Role,
    default: Role.Agent,
    example: Role.Agent,
  })
  @IsEnum(Role)
  role: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty({
    example: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
  })
  @IsString()
  placeId: string;
}

export class ResponseSignUpDto extends ResponseDto {}

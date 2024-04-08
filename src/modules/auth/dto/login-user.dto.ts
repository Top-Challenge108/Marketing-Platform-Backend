import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBase64,
  IsDefined,
  Matches,
  IsOptional,
  IsString,
  MinLength,
  NotEquals,
} from 'class-validator';

export class LoginDto {
  @IsOptional()
  @MinLength(1)
  @IsDefined()
  @NotEquals(null)
  @Transform((data) => data.value?.trim())
  @ApiProperty({
    example: 'app@gmail.com',
  })
  @Matches(
    /^([^@\s\."'<>\(\)\[\]\{\}\\/,:;]+\.)*[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+@[^@\s\._"'<>\(\)\[\]\{\}\\/,:;]+(\.[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+)+$/m,
    {
      message: 'This must be an email',
    },
  )
  email: string;

  @IsString()
  @MinLength(1)
  @IsDefined()
  @NotEquals(null)
  @ApiProperty({
    example: 'c3RyaW5n',
  })
  @IsBase64({
    // message: 'Password must be encrypt.',
  })
  password: string;
}

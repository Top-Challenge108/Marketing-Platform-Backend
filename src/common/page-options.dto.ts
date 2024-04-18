import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @IsEnum(Order)
  @ApiProperty({
    default: Order.ASC,
    required: false,
  })
  readonly order: Order = Order.ASC;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  readonly sort?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({
    required: false,
    default: 1,
  })
  readonly page: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({
    required: false,
    default: 10,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

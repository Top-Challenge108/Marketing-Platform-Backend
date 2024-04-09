import { AutoMap } from '@automapper/classes';
import { Currency, SubscriptionInterval } from '../enum/subscription.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpsertSubscriptionDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SubscriptionInterval)
  interval: SubscriptionInterval;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;
}

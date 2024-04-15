import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UpsertToolDealDto } from './upsert-tool-deal.dto';

export class UpsertToolDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shortDescription?: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  website?: string;

  @AutoMap(() => UpsertToolDealDto)
  @ApiProperty({
    description: 'List tool deals',
    type: UpsertToolDealDto,
    isArray: true,
  })
  toolDeals: UpsertToolDealDto[];
  //   @AutoMap()
  //   logo?: string;

  //   @AutoMap()
  //   screenshots?: string[];

  @AutoMap()
  @ApiProperty({
    description: 'An array of key features',
    type: [String],
    example: ['https://shadcn.com', 'http://twitter.com/shadcn'],
  })
  @IsString({ each: true })
  keyFeatures?: string[];

  @AutoMap()
  @ApiProperty()
  @ApiProperty({
    description: 'An array of key use cases',
    type: [String],
    example: ['https://shadcn.com', 'http://twitter.com/shadcn'],
  })
  @IsString({ each: true })
  useCases?: string[];

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  categoryId!: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  subscriptionId!: string;
}

import { AutoMap } from '@automapper/classes';
import { ToolDealDto } from './tool-deal.dto';
import { CategoryDto } from '../../category/dtos/category.dto';
import { ToolStatus } from '../entities/tool.entity';
import { AuthorDto } from './author.dto';

export class ToolDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  shortDescription?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  website?: string;

  @AutoMap()
  logo?: string;

  @AutoMap()
  screenshots?: string[];

  @AutoMap()
  status: ToolStatus;

  @AutoMap()
  keyFeatures?: string[];

  @AutoMap()
  useCases?: string[];

  @AutoMap()
  price: number;

  @AutoMap(() => ToolDealDto)
  toolDeals: ToolDealDto[];

  @AutoMap(() => CategoryDto)
  category!: CategoryDto;

  @AutoMap(() => AuthorDto)
  author: AuthorDto;
}

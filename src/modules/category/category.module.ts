import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CategoryMapper } from './mappers/category.mapper';
import { PermissionsModule } from '../permissions/permissions.module';
import { UserModule } from '../user/user.module';
import { FileEntity } from '../file/entities/file.entity';

const mappers = [CategoryMapper];

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, FileEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => PermissionsModule),
  ],
  providers: [CategoryService, ...mappers],
  controllers: [CategoryController],
})
export class CategoryModule {}

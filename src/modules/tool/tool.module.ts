/* istanbul ignore file */
import { Module, forwardRef } from '@nestjs/common';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from './entities/tool.entity';
import { ToolMapper } from './mapper/tool.mapper';
import { UserModule } from '../user/user.module';
import { ToolDealEntity } from './entities/tool-deal.entity';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToolEntity, ToolDealEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => PermissionsModule),
    LanguageModule,
  ],
  controllers: [ToolController],
  providers: [ToolService, LanguageService, ToolMapper],
  exports: [],
})
export class ToolModule {}

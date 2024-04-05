/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { LanguageEntity } from './entities/langugae.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}

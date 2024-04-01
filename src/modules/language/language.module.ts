/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguagesSchema, LANGUAGES_MODEL } from './schema/language.schema';
import { LanguagesRepository } from './language.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LANGUAGES_MODEL, schema: LanguagesSchema },
    ]),
  ],
  controllers: [LanguageController],
  providers: [LanguagesRepository, LanguageService],
  exports: [LanguagesRepository, LanguageService],
})
export class LanguageModule {}

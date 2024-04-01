import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LanguagesRepository } from './language.repository';

@Injectable()
export class LanguageService extends BaseAbstractService {
  constructor(
    private readonly languagesRepository: LanguagesRepository,
    i18nService: I18nService,
  ) {
    super(i18nService);
  }
}

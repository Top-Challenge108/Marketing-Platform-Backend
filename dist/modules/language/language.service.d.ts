import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LanguagesRepository } from './language.repository';
export declare class LanguageService extends BaseAbstractService {
    private readonly languagesRepository;
    constructor(languagesRepository: LanguagesRepository, i18nService: I18nService);
}

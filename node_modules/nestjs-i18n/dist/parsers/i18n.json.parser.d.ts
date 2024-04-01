import { I18nParser } from './i18n.parser';
import { OnModuleDestroy } from '@nestjs/common';
import { I18nTranslation } from '../interfaces/i18n-translation.interface';
import { Observable } from 'rxjs';
export interface I18nJsonParserOptions {
    path: string;
    filePattern?: string;
    watch?: boolean;
}
export declare class I18nJsonParser extends I18nParser implements OnModuleDestroy {
    private options;
    private watcher?;
    private events;
    constructor(options: I18nJsonParserOptions);
    onModuleDestroy(): Promise<void>;
    languages(): Promise<string[] | Observable<string[]>>;
    parse(): Promise<I18nTranslation | Observable<I18nTranslation>>;
    private parseTranslations;
    private parseLanguages;
    private sanitizeOptions;
}

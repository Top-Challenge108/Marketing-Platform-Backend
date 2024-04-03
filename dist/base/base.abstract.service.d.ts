import { I18nService } from 'nestjs-i18n';
import { IOptionLang, IResultDataCommon } from '../common/commom.interface';
export declare class BaseAbstractService {
    private _i18nService;
    protected constructor(_i18nService: I18nService);
    translate(key: string, options: object): any;
    formatOutputData(translateOptions: IOptionLang, resultData: IResultDataCommon, successFalse?: boolean): Promise<{
        success: boolean;
        message: any;
        result: object;
        statusCode: number;
    }>;
}

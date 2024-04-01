import { I18nService } from 'nestjs-i18n';
import { IOptionLang, IResultDataCommon } from '../common/commom.interface';

export class BaseAbstractService {
  private _i18nService: I18nService;
  protected constructor(_i18nService: I18nService) {
    this._i18nService = _i18nService;
  }
  public translate(key: string, options: object) {
    return this._i18nService.translate(key, options);
  }

  /**
   * Format the output data for responding
   */
  public async formatOutputData(
    translateOptions: IOptionLang,
    resultData: IResultDataCommon,
    successFalse = false,
  ) {
    const { lang, key, args } = translateOptions;
    const { data, statusCode } = resultData;

    let success = !data ? false : true;
    if (successFalse) {
      success = false;
    }
    return {
      success,
      message: await this.translate(key, {
        lang,
        args,
      }),
      result: !data ? null : data,
      statusCode: statusCode,
    };
  }
}

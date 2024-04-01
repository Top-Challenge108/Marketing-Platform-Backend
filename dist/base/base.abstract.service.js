"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAbstractService = void 0;
class BaseAbstractService {
    constructor(_i18nService) {
        this._i18nService = _i18nService;
    }
    translate(key, options) {
        return this._i18nService.translate(key, options);
    }
    async formatOutputData(translateOptions, resultData, successFalse = false) {
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
exports.BaseAbstractService = BaseAbstractService;
//# sourceMappingURL=base.abstract.service.js.map
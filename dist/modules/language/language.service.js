"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const language_repository_1 = require("./language.repository");
let LanguageService = class LanguageService extends base_abstract_service_1.BaseAbstractService {
    constructor(languagesRepository, i18nService) {
        super(i18nService);
        this.languagesRepository = languagesRepository;
    }
};
exports.LanguageService = LanguageService;
exports.LanguageService = LanguageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [language_repository_1.LanguagesRepository,
        nestjs_i18n_1.I18nService])
], LanguageService);
//# sourceMappingURL=language.service.js.map
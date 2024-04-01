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
exports.VerifyStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const configs_constants_1 = require("../../../configs/configs.constants");
const user_service_1 = require("../../user/user.service");
const common_constants_1 = require("../../../common/common.constants");
const language_service_1 = require("../../../modules/language/language.service");
const redis_service_1 = require("../../../modules/redis/redis.service");
let VerifyStrategy = class VerifyStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'verify') {
    constructor(usersService, languageService, redisService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configs_constants_1.JwtConfig.COMMON_API_JWT_SECRET,
            passReqToCallback: true,
        });
        this.usersService = usersService;
        this.languageService = languageService;
        this.redisService = redisService;
    }
    async validate(req, payload) {
        const { _id, deviceId } = payload;
        const checkLogout = await this.redisService.hGet(`access-token-${_id.toString()}`, deviceId);
        if (!checkLogout) {
            throw new common_1.HttpException(await this.usersService.formatOutputData({
                lang: common_constants_1.LanguageCode.United_States,
                key: 'translate.UNAUTHORIZED',
            }, { data: null, statusCode: common_constants_1.StatusCode.UNAUTHORIZED }), common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.usersService.findOneById(_id);
        if (!user) {
            throw new common_1.HttpException(await this.usersService.formatOutputData({
                lang: common_constants_1.LanguageCode.United_States,
                key: 'translate.USER_NOT_FOUND',
            }, { data: null, statusCode: common_constants_1.StatusCode.USER_NOT_FOUND }), common_1.HttpStatus.NOT_FOUND);
        }
        if (user.lastUpdatePassword &&
            user.lastUpdatePassword.getTime() !==
                new Date(payload === null || payload === void 0 ? void 0 : payload.lastUpdatePassword).getTime()) {
            throw new common_1.HttpException(await this.usersService.formatOutputData({
                lang: common_constants_1.LanguageCode.United_States,
                key: 'translate.USER_FORCE_LOGOUT_STATUS',
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.USER_FORCE_LOGOUT_STATUS,
            }), common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user.status !== common_constants_1.TypeStatus.ACTIVE) {
            throw new common_1.HttpException(await this.usersService.formatOutputData({
                lang: common_constants_1.LanguageCode.United_States,
                key: 'translate.YOUR_ACCOUNT_IS_DEACTIVATED',
            }, { data: null, statusCode: common_constants_1.StatusCode.USER_FORCE_LOGOUT_STATUS }), common_1.HttpStatus.FORBIDDEN);
        }
        payload.language = common_constants_1.LanguageCode.United_States;
        return payload;
    }
};
exports.VerifyStrategy = VerifyStrategy;
exports.VerifyStrategy = VerifyStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        language_service_1.LanguageService,
        redis_service_1.RedisService])
], VerifyStrategy);
//# sourceMappingURL=verify.strategy.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nestjs_i18n_1 = require("nestjs-i18n");
const common_constants_1 = require("../../common/common.constants");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const configs_constants_1 = require("../../configs/configs.constants");
const redis_service_1 = require("../redis/redis.service");
const user_service_1 = require("../user/user.service");
const language_service_1 = require("../language/language.service");
let TokenService = class TokenService extends base_abstract_service_1.BaseAbstractService {
    constructor(userService, jwtService, redisService, languageService, i18nService) {
        super(i18nService);
        this.userService = userService;
        this.jwtService = jwtService;
        this.redisService = redisService;
        this.languageService = languageService;
    }
    async createTokenLogin(userId, deviceId) {
        const userInfo = await this.userService.getUserInformationById(userId);
        const accessTokenPayload = {
            _id: userInfo._id.toString(),
            email: userInfo.email,
            phone: userInfo.phone,
            permissions: userInfo.permissions,
            lastUpdatePassword: userInfo.lastUpdatePassword,
            deviceId,
        };
        const refreshTokenPayload = {
            _id: userInfo._id.toString(),
            deviceId: deviceId,
            language: common_constants_1.LanguageCode.United_States,
            lastUpdatePassword: userInfo.lastUpdatePassword,
        };
        const accessTokenOptions = {
            expiresIn: configs_constants_1.JwtConfig.COMMON_API_JWT_EXPIRES_IN,
            secret: configs_constants_1.JwtConfig.COMMON_API_JWT_SECRET,
        };
        const refreshTokenOptions = {
            expiresIn: configs_constants_1.JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_EXPIRES_IN,
            secret: configs_constants_1.JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_SECRET,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessTokenPayload, accessTokenOptions),
            this.jwtService.signAsync(refreshTokenPayload, refreshTokenOptions),
        ]);
        await Promise.all([
            this.redisService.hSet(`refresh-token-${refreshTokenPayload._id}`, deviceId, refreshToken),
            this.redisService.hSet(`access-token-${accessTokenPayload._id}`, deviceId, accessToken),
        ]);
        userInfo.language = common_constants_1.LanguageCode.United_States;
        return {
            user: userInfo,
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(payload, refreshTokenDto) {
        const { deviceId } = refreshTokenDto;
        if (deviceId !== payload.deviceId) {
            throw new common_1.HttpException(await this.formatOutputData({
                lang: common_constants_1.LanguageCode.United_States,
                key: 'translate.UNAUTHORIZED',
            }, { data: null, statusCode: common_constants_1.StatusCode.UNAUTHORIZED }), common_1.HttpStatus.UNAUTHORIZED);
        }
        const userInfo = await this.userService.getUserInformationById(payload._id);
        const accessTokenPayload = {
            _id: userInfo._id.toString(),
            email: userInfo.email,
            phone: userInfo.phone,
            permissions: userInfo.permissions,
            deviceId,
            lastUpdatePassword: userInfo.lastUpdatePassword,
        };
        const accessTokenOptions = {
            expiresIn: configs_constants_1.JwtConfig.COMMON_API_JWT_EXPIRES_IN,
            secret: configs_constants_1.JwtConfig.COMMON_API_JWT_SECRET,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessTokenPayload, accessTokenOptions),
            this.redisService.hGet(`refresh-token-${payload._id.toString()}`, deviceId),
        ]);
        await this.redisService.hSet(`access-token-${accessTokenPayload._id}`, deviceId, accessToken);
        return {
            user: userInfo,
            accessToken,
            refreshToken,
        };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, redis_service_1.RedisService,
        language_service_1.LanguageService, typeof (_b = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _b : Object])
], TokenService);
//# sourceMappingURL=token.service.js.map
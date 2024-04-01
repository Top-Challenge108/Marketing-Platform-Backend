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
exports.VerifyRefreshTokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const redis_service_1 = require("../../../modules/redis/redis.service");
const configs_constants_1 = require("../../../configs/configs.constants");
const common_constants_1 = require("../../../common/common.constants");
const user_service_1 = require("../../../modules/user/user.service");
let VerifyRefreshTokenStrategy = class VerifyRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'verifyRefreshToken') {
    constructor(redisService, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configs_constants_1.JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
        this.redisService = redisService;
        this.userService = userService;
    }
    async validate(req, payload) {
        const { _id, deviceId } = payload;
        const refreshToken = await this.redisService.hGet(`refresh-token-${_id.toString()}`, deviceId);
        if (!refreshToken) {
            const result = await this.redisService.formatOutputData({
                key: 'translate.UNAUTHORIZED',
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.UNAUTHORIZED,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userService.findOneById(_id.toString());
        if (!user || user.status === common_constants_1.TypeStatus.DEACTIVATED) {
            const result = await this.redisService.formatOutputData({
                key: 'translate.UNAUTHORIZED',
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.UNAUTHORIZED,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.UNAUTHORIZED);
        }
        if ((user === null || user === void 0 ? void 0 : user.lastUpdatePassword.getTime()) !==
            new Date(payload === null || payload === void 0 ? void 0 : payload.lastUpdatePassword).getTime()) {
            const result = await this.redisService.formatOutputData({
                key: 'translate.USER_FORCE_LOGOUT_STATUS',
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.USER_FORCE_LOGOUT_STATUS,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.UNAUTHORIZED);
        }
        return payload;
    }
};
exports.VerifyRefreshTokenStrategy = VerifyRefreshTokenStrategy;
exports.VerifyRefreshTokenStrategy = VerifyRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        user_service_1.UserService])
], VerifyRefreshTokenStrategy);
//# sourceMappingURL=verify-refresh-token.strategy.js.map
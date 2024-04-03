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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const nestjs_i18n_1 = require("nestjs-i18n");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const common_constants_1 = require("../../common/common.constants");
const helpers_1 = require("../../common/helpers");
const bcrypt = require("bcrypt");
const token_service_1 = require("./token.service");
const redis_service_1 = require("../redis/redis.service");
const location_service_1 = require("../location/location.service");
let AuthService = class AuthService extends base_abstract_service_1.BaseAbstractService {
    constructor(userService, tokenService, redisService, i18nService, locationService) {
        super(i18nService);
        this.userService = userService;
        this.tokenService = tokenService;
        this.redisService = redisService;
        this.i18nService = i18nService;
        this.locationService = locationService;
    }
    async signUp(signUpDto) {
        const { email = null, password, phone, role, placeId, firstName, lastName, company, } = signUpDto;
        let response;
        let country;
        const userExisted = await this.userService.findUserByConditions({
            email,
        });
        if (userExisted) {
            response = await this.formatOutputData({
                key: `translate.USER_SIGN_UP_EMAIL_EXISTED`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                statusCode: common_constants_1.StatusCode.USER_SIGN_UP_EMAIL_EXISTED,
                data: null,
            });
            throw new common_1.HttpException(response, common_1.HttpStatus.BAD_REQUEST);
        }
        const { salt, hashPassword } = await this.userService.hashPassword((0, helpers_1.decodePassword)(password));
        const data = await (0, helpers_1.getPlaceDetails)(placeId);
        if (!data) {
            response = await this.formatOutputData({
                key: `translate.PLACE_ID_IS_NOT_CORRECT`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                statusCode: common_constants_1.StatusCode.PLACE_ID_IS_NOT_CORRECT,
                data: null,
            });
            throw new common_1.HttpException(response, common_1.HttpStatus.BAD_REQUEST);
        }
        const locationData = await this.locationService.findAndCreateLocation(data);
        const newUser = await this.userService.createUser({
            email,
            phone,
            status: common_constants_1.TypeStatus.ACTIVE,
            salt,
            password: hashPassword,
            language: common_constants_1.LanguageCode.United_States,
            country,
            locationId: locationData._id,
            role,
            firstName,
            lastName,
            company,
        });
        const token = await this.tokenService.createTokenLogin(newUser._id.toString(), 'portal');
        return this.formatOutputData({
            key: `translate.USER_SIGN_UP_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: common_constants_1.StatusCode.USER_SIGN_UP_SUCCESSFULLY,
            data: token,
        });
    }
    async signIn(loginDto, lang) {
        const { password, email } = loginDto;
        const result = {
            key: null,
            args: {},
            lang: lang,
            statusCode: null,
            data: null,
        };
        const userData = await this.userService.findUserByEmail(email);
        if (!userData) {
            return this.formatOutputData({ key: 'translate.EMAIL_NOT_EXIST', lang: result.lang }, { statusCode: common_constants_1.StatusCode.INVALID_EMAIL, data: result.data });
        }
        const checkPass = await bcrypt.compare((0, helpers_1.decodePassword)(password), userData.password);
        if (checkPass) {
            const token = await this.tokenService.createTokenLogin(userData._id.toString(), 'portal');
            result.key = 'translate.USER_LOGIN_SUCCESSFULLY';
            result.statusCode = common_constants_1.StatusCode.USER_LOGIN_SUCCESSFULLY;
            result.data = token;
            return this.formatOutputData({ key: result.key, lang: result.lang }, { statusCode: result.statusCode, data: result.data });
        }
        else {
            return this.formatOutputData({ key: 'translate.YOUR_ACCOUNT_IS_NOT_CORRECT', lang: result.lang }, {
                statusCode: common_constants_1.StatusCode.YOUR_ACCOUNT_IS_NOT_CORRECT,
                data: result.data,
            });
        }
    }
    async refreshToken(payload, refreshTokenDto) {
        return this.tokenService.refreshToken(payload, refreshTokenDto);
    }
    async logOut(user, logoutDto) {
        const { deviceId } = logoutDto;
        const { _id, language } = user;
        const lang = language;
        const userInfo = await this.userService.findOneById(_id);
        if (!userInfo) {
            throw new common_1.HttpException('Your account has been deactivated', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.redisService.hDel(`refresh-token-${userInfo._id.toString()}`, deviceId);
        await this.redisService.hDel(`access-token-${userInfo._id.toString()}`, deviceId);
        return this.formatOutputData({
            key: `translate.YOU_HAVE_BEEN_SUCCESSFULLY_LOGGED_OUT`,
            lang,
        }, {
            statusCode: common_constants_1.StatusCode.YOU_HAVE_BEEN_SUCCESSFULLY_LOGGED_OUT,
            data: {},
        });
    }
    validateSignUp(email = null, phone = null) {
        return (!email && !phone) || (email && phone);
    }
    async verifyToken() {
        return this.formatOutputData({
            key: `translate.VERIFY_TOKEN_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: common_constants_1.StatusCode.VERIFY_TOKEN_SUCCESSFULLY,
            data: {},
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService,
        redis_service_1.RedisService, typeof (_a = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _a : Object, location_service_1.LocationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
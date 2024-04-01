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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const response_login_dto_1 = require("./dto/response-login.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const common_dto_1 = require("../../common/common.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const logout_user_dto_1 = require("./dto/logout-user.dto");
const common_constants_1 = require("../../common/common.constants");
const axios_1 = require("axios");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    logOut(req, logOutDto) {
        return this.authService.logOut(req.user, logOutDto);
    }
    memberSignUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    login(loginDto, headerDto) {
        return this.authService.signIn(loginDto, headerDto.lang || common_constants_1.LanguageCode.United_States);
    }
    refreshToken(req, refreshTokenDto) {
        return this.authService.refreshToken(req.user, refreshTokenDto);
    }
    verifyToken() {
        return this.authService.verifyToken();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('verify')),
    (0, common_1.HttpCode)(axios_1.HttpStatusCode.Ok),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, logout_user_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Register new user by email.' }),
    (0, common_1.HttpCode)(axios_1.HttpStatusCode.Ok),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "memberSignUp", null);
__decorate([
    (0, common_1.Post)('/sign-in'),
    (0, swagger_1.ApiOperation)({ summary: 'User login by email.' }),
    (0, swagger_1.ApiOkResponse)({ type: response_login_dto_1.ResponseLoginDto }),
    (0, common_1.HttpCode)(axios_1.HttpStatusCode.Ok),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginDto,
        common_dto_1.HeaderDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('verifyRefreshToken')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(axios_1.HttpStatusCode.Ok),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('verify-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('verify')),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auths'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
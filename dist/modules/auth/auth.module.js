"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const configs_constants_1 = require("../../configs/configs.constants");
const language_module_1 = require("../language/language.module");
const redis_module_1 = require("../redis/redis.module");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const verify_refresh_token_strategy_1 = require("./strategies/verify-refresh-token.strategy");
const verify_strategy_1 = require("./strategies/verify.strategy");
const token_service_1 = require("./token.service");
const location_module_1 = require("../location/location.module");
const permissions_module_1 = require("../permissions/permissions.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            passport_1.PassportModule,
            redis_module_1.RedisModule,
            language_module_1.LanguageModule,
            jwt_1.JwtModule.register({
                secret: configs_constants_1.JwtConfig.COMMON_API_JWT_SECRET,
                signOptions: {
                    expiresIn: configs_constants_1.JwtConfig.COMMON_API_JWT_EXPIRES_IN,
                },
            }),
            location_module_1.LocationModule,
            permissions_module_1.PermissionsModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            token_service_1.TokenService,
            verify_strategy_1.VerifyStrategy,
            verify_refresh_token_strategy_1.VerifyRefreshTokenStrategy,
        ],
        exports: [token_service_1.TokenService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
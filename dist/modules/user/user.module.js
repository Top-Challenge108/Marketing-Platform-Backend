"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../user/schemas/user.schema");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_repository_1 = require("./user.repository");
const roles_module_1 = require("../roles/roles.module");
const permissions_module_1 = require("../permissions/permissions.module");
const language_module_1 = require("../language/language.module");
const redis_module_1 = require("../redis/redis.module");
const language_service_1 = require("../language/language.service");
const auth_module_1 = require("../auth/auth.module");
const location_module_1 = require("../location/location.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        providers: [user_service_1.UserService, user_repository_1.UserRepository, language_service_1.LanguageService],
        controllers: [user_controller_1.UserController],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.USER_MODEL, schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            language_module_1.LanguageModule,
            redis_module_1.RedisModule,
            auth_module_1.AuthModule,
            location_module_1.LocationModule,
        ],
        exports: [user_service_1.UserService, user_repository_1.UserRepository],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const permissions_service_1 = require("./permissions.service");
const permissions_schema_1 = require("./schema/permissions.schema");
const permissions_controller_1 = require("./permissions.controller");
const permissions_repository_1 = require("./permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const language_module_1 = require("../language/language.module");
const redis_module_1 = require("../redis/redis.module");
const user_module_1 = require("../user/user.module");
let PermissionsModule = class PermissionsModule {
};
exports.PermissionsModule = PermissionsModule;
exports.PermissionsModule = PermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: permissions_schema_1.PERMISSIONS_MODEL, schema: permissions_schema_1.PermissionsSchema },
            ]),
            redis_module_1.RedisModule,
            language_module_1.LanguageModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [permissions_controller_1.PermissionsController],
        providers: [permissions_service_1.PermissionsService, permissions_repository_1.PermissionsRepository, jwt_1.JwtService],
        exports: [permissions_service_1.PermissionsService],
    })
], PermissionsModule);
//# sourceMappingURL=permissions.module.js.map
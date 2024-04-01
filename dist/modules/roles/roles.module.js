"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const roles_service_1 = require("./roles.service");
const roles_schema_1 = require("./schema/roles.schema");
const roles_controller_1 = require("./roles.controller");
const roles_repository_1 = require("./roles.repository");
const user_role_schema_1 = require("./schema/user-role.schema");
const user_role_repository_1 = require("./user-role.repository");
const redis_module_1 = require("../redis/redis.module");
const language_module_1 = require("../language/language.module");
const language_service_1 = require("../language/language.service");
const permissions_module_1 = require("../permissions/permissions.module");
const user_module_1 = require("../user/user.module");
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            redis_module_1.RedisModule,
            mongoose_1.MongooseModule.forFeature([
                { name: roles_schema_1.ROLES_MODEL, schema: roles_schema_1.RolesSchema },
                { name: user_role_schema_1.USER_ROLE_MODEL, schema: user_role_schema_1.UserRoleSchema },
            ]),
            language_module_1.LanguageModule,
            (0, common_1.forwardRef)(() => permissions_module_1.PermissionsModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [roles_controller_1.RolesController],
        providers: [
            roles_service_1.RolesService,
            roles_repository_1.RolesRepository,
            user_role_repository_1.UserRoleRepository,
            jwt_1.JwtService,
            language_service_1.LanguageService,
        ],
        exports: [roles_service_1.RolesService],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map
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
exports.AppModule = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_i18n_1 = require("nestjs-i18n");
const nestjs_discovery_1 = require("@golevelup/nestjs-discovery");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const common_constants_1 = require("./common/common.constants");
const roles_module_1 = require("./modules/roles/roles.module");
const mongodb_config_1 = require("./database/config/mongodb.config");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const permissions_service_1 = require("./modules/permissions/permissions.service");
const language_module_1 = require("./modules/language/language.module");
const redis_module_1 = require("./modules/redis/redis.module");
const location_module_1 = require("./modules/location/location.module");
const payment_module_1 = require("./modules/payment/payment.module");
let AppModule = class AppModule {
    constructor(discover, permissionsService) {
        this.discover = discover;
        this.permissionsService = permissionsService;
    }
    async onModuleInit() {
        const decoratedMethods = await this.discover.methodsAndControllerMethodsWithMetaAtKey('permission');
        for (const item of decoratedMethods) {
            await this.permissionsService.create({
                action: item.meta.action,
                description: item.meta.description,
            });
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: common_constants_1.LanguageCode.United_States,
                parser: nestjs_i18n_1.I18nJsonParser,
                parserOptions: {
                    path: path.join(__dirname, '/i18n/'),
                    watch: true,
                },
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => (0, mongodb_config_1.mongoConfig)(),
            }),
            nestjs_command_1.CommandModule,
            nestjs_discovery_1.DiscoveryModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            permissions_module_1.PermissionsModule,
            roles_module_1.RolesModule,
            language_module_1.LanguageModule,
            redis_module_1.RedisModule,
            location_module_1.LocationModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [nestjs_discovery_1.DiscoveryService,
        permissions_service_1.PermissionsService])
], AppModule);
//# sourceMappingURL=app.module.js.map
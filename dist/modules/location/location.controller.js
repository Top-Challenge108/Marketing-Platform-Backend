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
exports.LocationController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../common/common.constants");
const permissions_decorator_1 = require("../../common/permissions.decorator");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const location_service_1 = require("./location.service");
const location_dto_1 = require("./dto/location.dto");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    getLocations() {
        return this.locationService.getLocations();
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)('/list'),
    (0, swagger_1.ApiOkResponse)({
        type: location_dto_1.LocationDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.VIEW_USER_LIST,
        description: common_constants_1.PermissionActions.VIEW_USER_LIST,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getLocations", null);
exports.LocationController = LocationController = __decorate([
    (0, swagger_1.ApiTags)('Locations'),
    (0, common_1.Controller)('locations'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map
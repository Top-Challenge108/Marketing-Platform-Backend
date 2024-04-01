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
exports.PermissionsController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const create_permissions_dto_1 = require("./dto/create-permissions.dto");
const update_permissions_dto_1 = require("./dto/update-permissions.dto");
const response_permissions_dto_1 = require("./dto/response-permissions.dto");
const get_permissions_dto_1 = require("./dto/get-permissions.dto");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    create(createPermissionsDto) {
        return this.permissionsService.create(createPermissionsDto);
    }
    getPermissions(getRolesDto) {
        return this.permissionsService.getPermissions(getRolesDto);
    }
    findOne(id) {
        return this.permissionsService.findOne(id);
    }
    update(id, updatePermissionsDto) {
        return this.permissionsService.update(id, updatePermissionsDto);
    }
    remove(id) {
        return this.permissionsService.remove(id);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: response_permissions_dto_1.ResponsePermissionsDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permissions_dto_1.CreatePermissionsDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: [response_permissions_dto_1.ResponsePermissionsDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_permissions_dto_1.GetPermissionsDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: response_permissions_dto_1.ResponsePermissionsDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: response_permissions_dto_1.ResponsePermissionsDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permissions_dto_1.UpdatePermissionsDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "remove", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, swagger_1.ApiTags)('Permissions'),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map
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
exports.RolesController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const create_roles_dto_1 = require("./dto/create-roles.dto");
const update_roles_dto_1 = require("./dto/update-roles.dto");
const response_roles_dto_1 = require("./dto/response-roles.dto");
const ids_dto_1 = require("./dto/ids.dto");
const get_roles_dto_1 = require("./dto/get-roles.dto");
const add_user_role_dto_1 = require("./dto/add-user-role.dto");
const common_constants_1 = require("../../common/common.constants");
const permissions_decorator_1 = require("../../common/permissions.decorator");
const id_role_dto_1 = require("./dto/id-role-dto");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    create(createRolesDto) {
        return this.rolesService.create(createRolesDto);
    }
    getAllPermissions(idsDto) {
        return this.rolesService.getAllPermissions(idsDto);
    }
    getRoles(getRolesDto) {
        return this.rolesService.getRoles(getRolesDto);
    }
    findOne(iDRoleDto) {
        return this.rolesService.findOne(iDRoleDto);
    }
    update(id, updateRolesDto) {
        return this.rolesService.update(id, updateRolesDto);
    }
    deleteUser(addUserRoleDto) {
        return this.rolesService.removeUserRoles(addUserRoleDto);
    }
    remove(id) {
        return this.rolesService.remove(id);
    }
    addUser(addUserRoleDto) {
        return this.rolesService.createUserRole(addUserRoleDto);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: response_roles_dto_1.ResponseRolesDto }),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.CREATE_NEW_ROLE,
        description: common_constants_1.PermissionActions.CREATE_NEW_ROLE,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_roles_dto_1.CreateRolesDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/get-permissions'),
    (0, swagger_1.ApiOkResponse)({ type: ids_dto_1.IdsDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ids_dto_1.IdsDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getAllPermissions", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, swagger_1.ApiOkResponse)({
        type: response_roles_dto_1.ResponseRolesDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.VIEW_ROLE_LIST,
        description: common_constants_1.PermissionActions.VIEW_ROLE_LIST,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_roles_dto_1.GetRolesDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.VIEW_ROLE_DETAIL,
        description: common_constants_1.PermissionActions.VIEW_ROLE_DETAIL,
    }),
    (0, swagger_1.ApiOkResponse)({ type: response_roles_dto_1.ResponseRolesDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_role_dto_1.IDRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.EDIT_ROLE,
        description: common_constants_1.PermissionActions.EDIT_ROLE,
    }),
    (0, swagger_1.ApiOkResponse)({ type: response_roles_dto_1.ResponseRolesDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_roles_dto_1.UpdateRolesDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete-user'),
    (0, swagger_1.ApiOkResponse)({ type: response_roles_dto_1.ResponseRolesDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_user_role_dto_1.AddUserRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/add-user'),
    (0, swagger_1.ApiOkResponse)({ type: response_roles_dto_1.ResponseRolesDto }),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.EDIT_ROLE,
        description: common_constants_1.PermissionActions.EDIT_ROLE,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_user_role_dto_1.AddUserRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "addUser", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map
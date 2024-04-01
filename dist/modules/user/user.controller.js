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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const id_dto_1 = require("./dto/id.dto");
const user_service_1 = require("./user.service");
const get_users_dto_1 = require("./dto/get-users.dto");
const edit_user_info_dto_1 = require("./dto/edit-user-info.dto");
const common_constants_1 = require("../../common/common.constants");
const reponse_get_info_dto_1 = require("./dto/reponse-get-info.dto");
const res_list_user_dto_1 = require("./dto/res-list-user.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const change_status_dto_1 = require("./dto/change-status.dto");
const common_dto_1 = require("../../common/common.dto");
const permissions_decorator_1 = require("../../common/permissions.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const put_object_dto_1 = require("./dto/put-object.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(getUserDto) {
        return this.userService.getUsersArg(getUserDto);
    }
    findUser(req) {
        return this.userService.getProfile(req.user);
    }
    getUploadSignedUrl(input, req) {
        return this.userService.generateSasUrl(input, req.user._id);
    }
    editUserInformation(req, editUserInfoDto) {
        return this.userService.editUserInformation(req.user, editUserInfoDto);
    }
    changeUserStatus({ user }, changeStatusDto, idDto) {
        return this.userService.changeUserStatus(user, idDto, changeStatusDto);
    }
    getUserDetails(req, idDto) {
        return this.userService.getUserInformation(idDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/list'),
    (0, swagger_1.ApiOkResponse)({
        type: res_list_user_dto_1.UserListDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_dto_1.GetUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get user information',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)('get-sas-url'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [put_object_dto_1.PutObjectDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUploadSignedUrl", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: common_dto_1.ResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_user_info_dto_1.EditUserInfoDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUserInformation", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: common_dto_1.ResponseDto }),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.EDIT_USER_PROFILE,
        description: common_constants_1.PermissionActions.EDIT_USER_PROFILE,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_status_dto_1.ChangeStatusDto,
        id_dto_1.IDDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        type: reponse_get_info_dto_1.ResponseGetInfoDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, permissions_decorator_1.Permission)({
        action: common_constants_1.PermissionActions.VIEW_USER_PROFILE,
        description: common_constants_1.PermissionActions.VIEW_USER_PROFILE,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, id_dto_1.IDDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetails", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const permissions_repository_1 = require("./permissions.repository");
const nestjs_i18n_1 = require("nestjs-i18n");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const common_constants_1 = require("../../common/common.constants");
let PermissionsService = class PermissionsService extends base_abstract_service_1.BaseAbstractService {
    constructor(permissionsRepository, i18nService) {
        super(i18nService);
        this.permissionsRepository = permissionsRepository;
    }
    async create(createPermissionsDto) {
        const existingPermission = await this.permissionsRepository.findOne({
            action: createPermissionsDto.action,
        });
        if (existingPermission) {
            return null;
        }
        return this.permissionsRepository.create(createPermissionsDto);
    }
    async getPermissions(getRolesDto) {
        const queryParam = ['action', 'description'];
        const options = {
            select: 'action description',
        };
        const conditions = {};
        if (!getRolesDto.sortBy) {
            getRolesDto.sortBy = 'createdAt_asc';
        }
        options['sort'] = Object.assign(Object.assign({}, options['sort']), { createdAt: 'asc' });
        const permissions = await this.permissionsRepository.queryList(getRolesDto, options, conditions, queryParam);
        return this.formatOutputData({
            key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY,
            data: permissions,
        });
    }
    async findOne(id) {
        const checkPermissions = await this.permissionsRepository.findOne({
            _id: id,
        });
        if (!checkPermissions) {
            throw new common_1.NotFoundException();
        }
        else {
            return checkPermissions;
        }
    }
    async update(id, updatePermissionsDto) {
        const permissions = await this.permissionsRepository.findOneAndUpdate({ _id: id }, updatePermissionsDto, { returnNewDocument: true });
        if (!permissions) {
            throw new common_1.NotFoundException();
        }
        else {
            return permissions;
        }
    }
    async remove(id) {
        const permissions = await this.permissionsRepository.findOneAndDelete({
            _id: id,
        });
        if (!permissions)
            throw new common_1.NotFoundException();
    }
    async paginate(getPermissionsDto) {
        const { limit, page } = getPermissionsDto;
        return this.formatOutputData({
            key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.Vn,
        }, {
            statusCode: common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY,
            data: await this.permissionsRepository.paginate({}, { limit, page }),
        });
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permissions_repository_1.PermissionsRepository, typeof (_a = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _a : Object])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map
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
exports.RolesService = void 0;
const mongoose_1 = require("mongoose");
const nestjs_i18n_1 = require("nestjs-i18n");
const common_1 = require("@nestjs/common");
const roles_repository_1 = require("./roles.repository");
const user_role_repository_1 = require("./user-role.repository");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const common_constants_1 = require("../../common/common.constants");
const user_service_1 = require("../user/user.service");
let RolesService = class RolesService extends base_abstract_service_1.BaseAbstractService {
    constructor(rolesRepository, userRoleRepository, i18nService, userService) {
        super(i18nService);
        this.rolesRepository = rolesRepository;
        this.userRoleRepository = userRoleRepository;
        this.userService = userService;
    }
    async checkUserExist(userId, roleId) {
        return this.userRoleRepository.findOne({
            userId,
            roleId,
        });
    }
    async create(createRolesDto) {
        const existingRole = await this.rolesRepository.findOne({
            name: { $regex: new RegExp(`^${createRolesDto.name}$`, 'i') },
        });
        if (existingRole) {
            const result = await this.formatOutputData({
                key: `translate.ROLE_NAME_ALREADY_EXIT`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.ROLE_NAME_ALREADY_EXIT,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.CONFLICT);
        }
        return this.rolesRepository.create(createRolesDto);
    }
    async getAllPermissions(idsDto) {
        const ids = idsDto.ids;
        const roles = await this.rolesRepository
            .findAll({ _id: { $in: ids }, active: true })
            .lean();
        const allPermissionsUnique = [
            ...new Set(roles.map((role) => role.permissions).flat()),
        ];
        return allPermissionsUnique;
    }
    async findOne(idRoleDto) {
        const { id } = idRoleDto;
        const checkRole = await this.rolesRepository
            .aggregate([
            {
                $lookup: {
                    from: 'user-roles',
                    localField: '_id',
                    foreignField: 'roleId',
                    as: 'userRoles',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userRoles.userId',
                    foreignField: '_id',
                    as: 'users',
                },
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    active: 1,
                    permissions: 1,
                    users: {
                        $map: {
                            input: '$users',
                            as: 'u',
                            in: {
                                fullName: { $concat: ['$$u.firstName', ' ', '$$u.lastName'] },
                                email: '$$u.email',
                                phone: '$$u.phone',
                                _id: '$$u._id',
                                status: '$$u.status',
                            },
                        },
                    },
                },
            },
        ])
            .match({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!checkRole.length || checkRole[0].name === 'Super Admin') {
            const response = await this.formatOutputData({
                key: `translate.ROLE_NOT_FOUND`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                statusCode: common_constants_1.StatusCode.ROLE_NOT_FOUND,
                data: null,
            });
            throw new common_1.HttpException(response, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return checkRole[0];
        }
    }
    async getRoles(getRolesDto) {
        const queryParam = ['_id', 'name'];
        const options = {
            select: 'name description active permissions',
        };
        const conditions = {};
        switch (getRolesDto === null || getRolesDto === void 0 ? void 0 : getRolesDto.active) {
            case 'true': {
                conditions['active'] = true;
                break;
            }
            case 'false': {
                conditions['active'] = false;
                break;
            }
        }
        if (!getRolesDto.sortBy) {
            getRolesDto.sortBy = 'name_asc';
        }
        options['sort'] = Object.assign(Object.assign({}, options['sort']), { createdAt: 'asc' });
        const roles = await this.rolesRepository.queryList(getRolesDto, options, conditions, queryParam);
        return this.formatOutputData({
            key: roles
                ? `translate.GET_LIST_ROLES_SUCCESSFULLY`
                : `translate.GET_LIST_ROLES_FAIL`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: roles
                ? common_constants_1.StatusCode.GET_LIST_ROLES_SUCCESSFULLY
                : common_constants_1.StatusCode.GET_LIST_ROLES_FAIL,
            data: roles,
        });
    }
    async update(id, updateRolesDto) {
        let existingRole;
        if (updateRolesDto.name) {
            existingRole = await this.rolesRepository.aggregate([
                {
                    $project: {
                        name: { $toLower: '$name' },
                    },
                },
                {
                    $match: {
                        _id: { $ne: new mongoose_1.default.Types.ObjectId(id) },
                        name: updateRolesDto.name.toLowerCase(),
                    },
                },
            ]);
        }
        else {
            existingRole = await this.rolesRepository.aggregate([
                {
                    $match: {
                        _id: { $ne: new mongoose_1.default.Types.ObjectId(id) },
                    },
                },
            ]);
        }
        if (existingRole && existingRole.length > 0) {
            const result = await this.formatOutputData({
                key: `translate.ROLE_NAME_ALREADY_EXIT`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.ROLE_NAME_ALREADY_EXIT,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.CONFLICT);
        }
        const [roles] = await Promise.all([
            this.rolesRepository
                .findOneAndUpdate({ _id: id }, updateRolesDto, {
                returnNewDocument: true,
            })
                .lean(),
            this.userRoleRepository.findAll({ roleId: id }),
        ]);
        if (!roles) {
            throw new common_1.NotFoundException();
        }
        else {
            return Object.assign(Object.assign({}, roles), updateRolesDto);
        }
    }
    async remove(id) {
        const roles = await this.rolesRepository.findOneAndDelete({ _id: id });
        if (!roles)
            throw new common_1.NotFoundException();
    }
    async paginate(getRolesDto) {
        const { limit, page } = getRolesDto;
        return this.formatOutputData({
            key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.Vn,
        }, {
            statusCode: common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY,
            data: await this.rolesRepository.paginate({}, { limit, page }),
        });
    }
    mapGetUserId(users) {
        return users.map((user) => user.userId.toString());
    }
    mapCreateUserRole(userIds, roleId) {
        return userIds.map((userId) => ({ userId, roleId }));
    }
    async createUserRole(addUserRoleDto) {
        const { userIds, roleId } = addUserRoleDto;
        const checkUsers = await this.userService.findByIds(userIds);
        if (checkUsers.length !== userIds.length) {
            return this.formatOutputData({
                key: `translate.ADD_USER_ROLE_USER_NOT_EXIT`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: {},
                statusCode: common_constants_1.StatusCode.ADD_USER_ROLE_USER_NOT_EXIT,
            });
        }
        const checkRole = await this.rolesRepository.findById(roleId);
        if (!checkRole) {
            return this.formatOutputData({
                key: `translate.ROLE_NOT_FOUND`,
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                data: {},
                statusCode: common_constants_1.StatusCode.ROLE_NOT_FOUND,
            });
        }
        const [userRole] = await Promise.all([
            this.mapCreateUserRole(userIds, roleId),
            this.userRoleRepository.deleteMany({
                roleId: roleId,
                userId: {
                    $in: userIds,
                },
            }),
        ]);
        const result = await this.userRoleRepository.create(userRole);
        return this.formatOutputData({
            key: `translate.ADD_USER_ROLE`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            data: result,
            statusCode: common_constants_1.StatusCode.ADD_USER_ROLE,
        });
    }
    async removeUserRoles(addUserRoleDto) {
        const { userIds, roleId } = addUserRoleDto;
        return this.userRoleRepository.deleteMany({
            userId: { $in: userIds },
            roleId,
        });
    }
    async getRoleByName(name) {
        return this.rolesRepository.findOne({ name });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [roles_repository_1.RolesRepository,
        user_role_repository_1.UserRoleRepository,
        nestjs_i18n_1.I18nService,
        user_service_1.UserService])
], RolesService);
//# sourceMappingURL=roles.service.js.map
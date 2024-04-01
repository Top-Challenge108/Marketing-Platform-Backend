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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const nestjs_i18n_1 = require("nestjs-i18n");
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../common/common.constants");
const user_repository_1 = require("./user.repository");
const base_abstract_service_1 = require("../../base/base.abstract.service");
const helpers_1 = require("../../common/helpers");
const roles_service_1 = require("../roles/roles.service");
const language_service_1 = require("../language/language.service");
const token_service_1 = require("../auth/token.service");
const location_service_1 = require("../location/location.service");
let UserService = class UserService extends base_abstract_service_1.BaseAbstractService {
    constructor(userRepository, i18nService, rolesService, languageService, tokenService, locationService) {
        super(i18nService);
        this.userRepository = userRepository;
        this.rolesService = rolesService;
        this.languageService = languageService;
        this.tokenService = tokenService;
        this.locationService = locationService;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        return {
            salt,
            hashPassword,
        };
    }
    async findUserByEmail(email) {
        return this.userRepository.findOne({
            email,
        });
    }
    async findUserByGoogleId(googleId) {
        return this.userRepository.findOne({
            googleId,
        });
    }
    async changePassword(user, changePasswordDto) {
        const { _id, language } = user;
        const lang = language;
        const { oldPassword, newPassword, deviceId } = changePasswordDto;
        const userData = await this.userRepository.findById(_id);
        if (!userData) {
            const result = await this.formatOutputData({
                key: `translate.USER_NOT_FOUND`,
                lang,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.USER_NOT_FOUND,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.NOT_FOUND);
        }
        const checkPassword = await bcrypt.compare((0, helpers_1.decodePassword)(oldPassword), userData.password);
        const decodePass = (0, helpers_1.decodePassword)(newPassword);
        if (!checkPassword) {
            const result = await this.formatOutputData({
                key: `translate.WRONG_PASSWORD`,
                lang,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.WRONG_PASSWORD,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.BAD_REQUEST);
        }
        const checkSamePassword = await bcrypt.compare(decodePass, userData.password);
        if (checkSamePassword) {
            const result = await this.formatOutputData({
                key: `translate.NEW_PASSWORD_SAME_OLD_PASSWORD`,
                lang,
            }, {
                data: null,
                statusCode: common_constants_1.StatusCode.NEW_PASSWORD_SAME_OLD_PASSWORD,
            });
            throw new common_1.HttpException(result, common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await this.hashPassword(decodePass);
        userData.password = hashPassword.hashPassword;
        userData.salt = hashPassword.salt;
        userData.lastUpdatePassword = new Date();
        await userData.save();
        const newToken = await this.tokenService.createTokenLogin(userData._id.toString(), deviceId);
        return this.formatOutputData({
            key: `translate.CHANGE_PASSWORD_SUCCESSFULLY`,
            lang,
        }, {
            data: newToken,
            statusCode: common_constants_1.StatusCode.CHANGE_PASSWORD_SUCCESSFULLY,
        });
    }
    async getUsers(getUserDto) {
        var _a, _b, _c;
        const { sortBy } = getUserDto;
        const queryParam = ['_id', 'fullName', 'email', 'phone'];
        const options = {
            select: 'email firstName lastName phone status joinDate location company locationId',
        };
        if (!sortBy) {
            getUserDto.sortBy = 'joinDate_asc';
        }
        if (((_a = getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.sortBy) === null || _a === void 0 ? void 0 : _a.split('_')[0]) === 'fullName') {
            options['sort'] = {
                firstName: (_b = getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.sortBy) === null || _b === void 0 ? void 0 : _b.split('_')[1],
                lastName: (_c = getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.sortBy) === null || _c === void 0 ? void 0 : _c.split('_')[1],
            };
        }
        const conditions = {};
        switch (getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.status) {
            case common_constants_1.TypeStatus.ACTIVE: {
                conditions['status'] = common_constants_1.TypeStatus.ACTIVE;
                break;
            }
            case common_constants_1.TypeStatus.DEACTIVATED: {
                conditions['status'] = common_constants_1.TypeStatus.DEACTIVATED;
                break;
            }
        }
        options['sort'] = Object.assign(Object.assign({}, options['sort']), { createdAt: 'asc' });
        const users = await this.userRepository.queryList(getUserDto, options, conditions, queryParam);
        return this.formatOutputData({
            key: users
                ? `translate.GET_LIST_USERS_SUCCESSFULLY`
                : `translate.GET_LIST_USERS_FAIL`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: users
                ? common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY
                : common_constants_1.StatusCode.GET_LIST_USERS_FAIL,
            data: users,
        });
    }
    async getUsersArg(getUserDto) {
        var _a, _b, _c;
        const { placeId, sortBy, status, role } = getUserDto;
        const queryParam = ['_id', 'fullName', 'email', 'phone'];
        const options = {
            select: 'email firstName lastName phone status joinDate location company locationId role avatar fullName website bio',
        };
        const match = {};
        if (!sortBy) {
            getUserDto.sortBy = 'joinDate_asc';
        }
        if (status) {
            match['status'] = status;
        }
        const query = [
            {
                $lookup: {
                    from: 'locations',
                    localField: 'locationId',
                    foreignField: '_id',
                    as: 'location',
                },
            },
            {
                $lookup: {
                    from: 'user-roles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'roles',
                },
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roles.roleId',
                    foreignField: '_id',
                    as: 'role',
                },
            },
        ];
        if (role) {
            match['role.name'] =
                typeof role === 'string' ? { $in: [role] } : { $in: role };
        }
        if (placeId) {
            const locationData = await (0, helpers_1.getPlaceDetails)(placeId);
            if (!locationData) {
                const response = await this.formatOutputData({
                    key: `translate.PLACE_ID_IS_NOT_CORRECT`,
                    lang: common_constants_1.LanguageCode.United_States,
                }, {
                    statusCode: common_constants_1.StatusCode.PLACE_ID_IS_NOT_CORRECT,
                    data: null,
                });
                throw new common_1.HttpException(response, common_1.HttpStatus.BAD_REQUEST);
            }
            match['location.location'] = {
                $geoWithin: {
                    $centerSphere: [locationData.location, 20 / 6371],
                },
            };
        }
        if (((_a = getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.sortBy) === null || _a === void 0 ? void 0 : _a.split('_')[0]) === 'fullName') {
            options['sort'] = {
                firstName: (_b = getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.sortBy) === null || _b === void 0 ? void 0 : _b.split('_')[1],
                lastName: (_c = getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.sortBy) === null || _c === void 0 ? void 0 : _c.split('_')[1],
            };
        }
        options['sort'] = Object.assign(Object.assign({}, options['sort']), { createdAt: 'asc' });
        const users = await this.userRepository.queryListAggregate(getUserDto, options, query, queryParam, match);
        for (let index = 0; index < users.data.length; index++) {
            const user = users.data[index];
            users.data[index].avatarUrl = !user.avatar
                ? ''
                : await (0, helpers_1.getSasUrl)(user.avatar, common_constants_1.SasPermission.Read, user._id);
        }
        return this.formatOutputData({
            key: users
                ? `translate.GET_LIST_USERS_SUCCESSFULLY`
                : `translate.GET_LIST_USERS_FAIL`,
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: users
                ? common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY
                : common_constants_1.StatusCode.GET_LIST_USERS_FAIL,
            data: users,
        });
    }
    async findOneById(_id) {
        return this.userRepository.findOne({ _id });
    }
    async create(createTodoDto) {
        return this.userRepository.create(createTodoDto);
    }
    async updateOneById(_id, updateOneTodoDto) {
        return this.userRepository.updateOne({ _id }, updateOneTodoDto, {
            new: true,
        });
    }
    async deleteOneById(_id) {
        return this.userRepository.deleteOne({ _id });
    }
    async getProfile(user) {
        const { _id } = user;
        const outPutData = {
            key: `translate.GET_USER_INFORMATION_FAIL`,
            lang: common_constants_1.LanguageCode.United_States,
            statusCode: common_constants_1.StatusCode.GET_USER_INFORMATION_FAIL,
            data: null,
        };
        const userInfo = await this.userRepository
            .aggregate([
            {
                $lookup: {
                    from: 'user-roles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'userRoles',
                },
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'userRoles.roleId',
                    foreignField: '_id',
                    as: 'roles',
                },
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'locationId',
                    foreignField: '_id',
                    as: 'location',
                },
            },
            {
                $project: {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    phone: 1,
                    status: 1,
                    joinDate: 1,
                    citizenship: 1,
                    gender: 1,
                    userRoles: 1,
                    dob: 1,
                    type: 1,
                    roles: 1,
                    language: 1,
                    avatar: 1,
                    role: 1,
                    company: 1,
                    location: 1,
                    website: 1,
                    bio: 1,
                },
            },
        ])
            .match({
            _id: new mongoose_1.default.Types.ObjectId(_id),
        });
        userInfo[0].userRoles = undefined;
        userInfo[0].avatar = !userInfo[0].avatar
            ? ''
            : await (0, helpers_1.getSasUrl)(userInfo[0].avatar, common_constants_1.SasPermission.Read, _id);
        userInfo[0].location = !userInfo[0].location ? {} : userInfo[0].location[0];
        userInfo[0].language = common_constants_1.LanguageCode.United_States;
        if (userInfo.length) {
            outPutData.key = `translate.GET_USER_INFORMATION_SUCCESS`;
            outPutData.statusCode = common_constants_1.StatusCode.GET_USER_INFORMATION_SUCCESS;
            outPutData.data = Object.assign(Object.assign({}, userInfo[0]), { roles: userInfo[0].roles.filter((role) => role.active === true) });
        }
        return this.formatOutputData({
            key: outPutData.key,
            lang: outPutData.lang,
        }, {
            statusCode: outPutData.statusCode,
            data: outPutData.data,
        });
    }
    async getUserInformationById(id) {
        const user = await this.userRepository
            .aggregate([
            {
                $lookup: {
                    from: 'user-roles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'userRoles',
                },
            },
            {
                $project: {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    phone: 1,
                    status: 1,
                    joinDate: 1,
                    citizenship: 1,
                    gender: 1,
                    userRoles: 1,
                    dob: 1,
                    type: 1,
                    lastUpdatePassword: 1,
                    language: 1,
                    avatar: 1,
                },
            },
        ])
            .match({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        user[0].avatar = !user[0].avatar
            ? ''
            : await (0, helpers_1.getSasUrl)(user[0].avatar, common_constants_1.SasPermission.Read, id);
        const listRoleIds = user[0].userRoles.map((userRole) => userRole.roleId);
        const idsDto = { ids: listRoleIds };
        const permissions = await this.rolesService.getAllPermissions(idsDto);
        delete user[0]['userRoles'];
        return Object.assign(Object.assign({}, user[0]), { permissions });
    }
    async getUserInformation(iddto) {
        const { id } = iddto;
        const outPutData = {
            key: `translate.USER_NOT_FOUND`,
            lang: common_constants_1.LanguageCode.United_States,
            statusCode: common_constants_1.StatusCode.USER_NOT_FOUND,
            data: null,
        };
        const userInfo = await this.userRepository
            .aggregate([
            {
                $lookup: {
                    from: 'user-roles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'userRoles',
                },
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'userRoles.roleId',
                    foreignField: '_id',
                    as: 'roles',
                },
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'locationId',
                    foreignField: '_id',
                    as: 'location',
                },
            },
            {
                $project: {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    phone: 1,
                    status: 1,
                    joinDate: 1,
                    citizenship: 1,
                    gender: 1,
                    userRoles: 1,
                    dob: 1,
                    type: 1,
                    roles: 1,
                    avatar: 1,
                    location: 1,
                },
            },
            { $unset: 'userRoles' },
        ])
            .match({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!userInfo.length) {
            const response = await this.formatOutputData({
                key: outPutData.key,
                lang: outPutData.lang,
            }, {
                statusCode: outPutData.statusCode,
                data: outPutData.data,
            });
            throw new common_1.HttpException(response, common_1.HttpStatus.NOT_FOUND);
        }
        userInfo[0].avatar = !userInfo[0].avatar
            ? ''
            : await (0, helpers_1.getSasUrl)(userInfo[0].avatar, common_constants_1.SasPermission.Read, id);
        userInfo[0].location = !userInfo[0].location ? {} : userInfo[0].location[0];
        outPutData.key = `translate.GET_USER_DETAILS_SUCCESS`;
        outPutData.statusCode = common_constants_1.StatusCode.GET_USER_DETAILS_SUCCESS;
        outPutData.data = Object.assign({}, userInfo[0]);
        return this.formatOutputData({
            key: outPutData.key,
            lang: outPutData.lang,
        }, {
            statusCode: outPutData.statusCode,
            data: outPutData.data,
        });
    }
    async paginate(getUserDto) {
        const { limit, page } = getUserDto;
        return this.formatOutputData({
            key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
            lang: common_constants_1.LanguageCode.Vn,
        }, {
            statusCode: common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY,
            data: await this.userRepository.paginate({}, { limit, page }),
        });
    }
    async aggregatePaginate(getUserDto) {
        const { limit, page } = getUserDto;
        return this.userRepository.aggregatePaginate([], { limit, page });
    }
    async getListUserActiveByRole(userActiveDto, lang) {
        const { roleId } = userActiveDto;
        const result = await this.userRepository.findUserActive(userActiveDto);
        const users = result.data;
        for (let i = 0; i < users.length; i++) {
            const checkUserExist = await this.rolesService.checkUserExist(users[i]._id.toString(), roleId);
            const user = {
                _id: users[i]._id,
                fullName: users[i].firstName.trim() + ' ' + users[i].lastName.trim(),
                status: users[i].status,
            };
            let isExist = true;
            if (!checkUserExist) {
                isExist = false;
            }
            users[i] = Object.assign(Object.assign({}, user), { isExist });
        }
        result.data = users;
        return this.formatOutputData({
            key: result
                ? `translate.GET_LIST_USERS_SUCCESSFULLY`
                : `translate.GET_LIST_USERS_FAIL`,
            lang: lang || common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: result
                ? common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY
                : common_constants_1.StatusCode.GET_LIST_USERS_FAIL,
            data: result,
        });
    }
    isValidDate(dob) {
        if (!dob) {
            return true;
        }
        const arrayDate = dob.toString().split('-');
        if (arrayDate.length < 3) {
            return false;
        }
        const editDate = new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2].split('T')[0]);
        return arrayDate[1] == editDate.getMonth() + 1;
    }
    async editUserInformation(user, editUserInfoDto) {
        const { _id } = user;
        let locationId;
        const outPutData = {
            key: `translate.UPDATE_USER_INFORMATION_FAIL`,
            lang: common_constants_1.LanguageCode.United_States,
            statusCode: common_constants_1.StatusCode.UPDATE_USER_INFORMATION_FAIL,
            data: null,
        };
        const userExisted = await this.findOneById(_id);
        if (editUserInfoDto.placeId) {
            const location = await (0, helpers_1.getPlaceDetails)(editUserInfoDto.placeId);
            if (!location) {
                const response = await this.formatOutputData({
                    key: `translate.PLACE_ID_IS_NOT_CORRECT`,
                    lang: common_constants_1.LanguageCode.United_States,
                }, {
                    statusCode: common_constants_1.StatusCode.PLACE_ID_IS_NOT_CORRECT,
                    data: null,
                });
                throw new common_1.HttpException(response, common_1.HttpStatus.BAD_REQUEST);
            }
            const locationData = await this.locationService.findAndCreateLocation(location);
            locationId = locationData._id;
        }
        const editUser = await this.userRepository.findByIdAndUpdate(_id, Object.assign(Object.assign({}, editUserInfoDto), { lastName: editUserInfoDto.lastName
                ? editUserInfoDto.lastName
                : userExisted.lastName, firstName: editUserInfoDto.firstName
                ? editUserInfoDto.firstName
                : userExisted.firstName, company: editUserInfoDto.company
                ? editUserInfoDto.company
                : userExisted.company, phone: editUserInfoDto.phone ? editUserInfoDto.phone : userExisted.phone, bio: editUserInfoDto.bio ? editUserInfoDto.bio : userExisted.bio, locationId: editUserInfoDto.placeId ? locationId : userExisted.locationId, avatar: editUserInfoDto.avatar
                ? editUserInfoDto.avatar
                : userExisted.avatar }));
        if (editUser) {
            outPutData.key = `translate.UPDATE_USER_INFORMATION_SUCCESS`;
            outPutData.statusCode = common_constants_1.StatusCode.UPDATE_USER_INFORMATION_SUCCESS;
            outPutData.data = {};
        }
        return this.formatOutputData({
            key: outPutData.key,
            lang: outPutData.lang,
        }, {
            statusCode: outPutData.statusCode,
            data: outPutData.data,
        });
    }
    async changeUserStatus(user, idDto, changeStatusDto) {
        const { id } = idDto;
        const { language } = user;
        const lang = language;
        const outPutData = {
            key: `translate.UPDATE_USER_INFORMATION_FAIL`,
            lang: lang || common_constants_1.LanguageCode.United_States,
            statusCode: common_constants_1.StatusCode.UPDATE_USER_INFORMATION_FAIL,
            data: null,
        };
        try {
            if (user._id.toString() === id) {
                outPutData.key = `translate.USER_CANNOT_CHANGE_THEIR_STATUS`;
                outPutData.statusCode = common_constants_1.StatusCode.USER_CANNOT_CHANGE_THEIR_STATUS;
                throw new common_1.BadRequestException();
            }
            else {
                const changeUser = await this.userRepository.findByIdAndUpdate(id, Object.assign(Object.assign({}, changeStatusDto), { lastUpdatePassword: changeStatusDto.status === common_constants_1.TypeStatus.ACTIVE
                        ? undefined
                        : new Date() }));
                if (changeUser) {
                    outPutData.key = `translate.UPDATE_USER_INFORMATION_SUCCESS`;
                    outPutData.statusCode = common_constants_1.StatusCode.UPDATE_USER_INFORMATION_SUCCESS;
                    outPutData.data = Object.assign({}, changeStatusDto);
                }
            }
            return this.formatOutputData({
                key: outPutData.key,
                lang: outPutData.lang,
            }, {
                statusCode: outPutData.statusCode,
                data: outPutData.data,
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(await this.formatOutputData({
                key: outPutData.key,
                lang: outPutData.lang,
            }, {
                statusCode: outPutData.statusCode,
                data: outPutData.data,
            }));
        }
    }
    async createUser(user) {
        const userData = await this.userRepository.create(user);
        const role = await this.rolesService.getRoleByName(user.role);
        await this.rolesService.createUserRole({
            userIds: [userData._id],
            roleId: role === null || role === void 0 ? void 0 : role._id,
        });
        return userData;
    }
    async findUserByConditions(conditions) {
        return this.userRepository.findOne(conditions);
    }
    async getListUsersActive(lang, searchSortDto) {
        const userData = await this.userRepository.getUsersActive(searchSortDto);
        return this.formatOutputData({
            key: userData
                ? `translate.GET_LIST_USERS_SUCCESSFULLY`
                : `translate.GET_LIST_USERS_FAIL`,
            lang: lang || common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: common_constants_1.StatusCode.GET_LIST_USERS_SUCCESSFULLY,
            data: userData,
        });
    }
    async generateSasUrl(putObjectDto, id) {
        const { fileName, permissions } = putObjectDto;
        const validatePermission = (0, helpers_1.validateSasPermission)(permissions);
        if (!validatePermission) {
            const response = await this.formatOutputData({
                key: 'translate.GET_SAS_URL_INCORRECT_PERMISSION',
                lang: common_constants_1.LanguageCode.United_States,
            }, {
                statusCode: common_constants_1.StatusCode.GET_SAS_URL_INCORRECT_PERMISSION,
                data: null,
            });
            throw new common_1.HttpException(response, common_1.HttpStatus.BAD_REQUEST);
        }
        const sasUrl = await (0, helpers_1.getSasUrl)(fileName, permissions, id);
        return this.formatOutputData({
            key: 'translate.GET_SAS_URL_SUCCESSFULLY',
            lang: common_constants_1.LanguageCode.United_States,
        }, {
            statusCode: common_constants_1.StatusCode.GET_SAS_URL_SUCCESSFULLY,
            data: { sasUrl },
        });
    }
    findByIds(ids) {
        if (!ids.length)
            return;
        return this.userRepository.aggregate([]).match({
            _id: {
                $in: ids.map((id) => new mongoose_1.default.Types.ObjectId(id)),
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        nestjs_i18n_1.I18nService,
        roles_service_1.RolesService,
        language_service_1.LanguageService,
        token_service_1.TokenService,
        location_service_1.LocationService])
], UserService);
//# sourceMappingURL=user.service.js.map
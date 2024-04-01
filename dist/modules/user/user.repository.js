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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const base_abstract_repository_1 = require("../../base/base.abstract.repository");
const common_constants_1 = require("../../common/common.constants");
let UserRepository = class UserRepository extends base_abstract_repository_1.BaseAbstractRepository {
    constructor(userModel) {
        super(userModel);
        this.userModel = userModel;
    }
    async findUserActive(userActiveDto) {
        const queryParam = ['_id', 'fullName'];
        const options = {
            select: 'firstName lastName status',
            lean: true,
        };
        const condition = {
            status: common_constants_1.TypeStatus.ACTIVE,
            isVerified: true,
        };
        return this.queryList(userActiveDto, options, condition, queryParam);
    }
    async getUsersActive(getUserDto) {
        const queryParam = ['_id', 'fullName'];
        const options = { select: 'firstName lastName status joinDate' };
        if (!getUserDto.sortBy) {
            getUserDto.sortBy = 'joinDate_desc';
        }
        const condition = {
            status: common_constants_1.TypeStatus.ACTIVE,
            isVerified: true,
        };
        return this.queryList(getUserDto, options, condition, queryParam);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.USER_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
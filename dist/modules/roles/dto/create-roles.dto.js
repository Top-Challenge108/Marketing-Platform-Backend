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
exports.CreateRolesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_constants_1 = require("../../../common/common.constants");
class CreateRolesDto {
}
exports.CreateRolesDto = CreateRolesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: common_constants_1.Role,
        default: common_constants_1.Role.Agent,
        example: common_constants_1.Role.Agent,
    }),
    (0, class_validator_1.IsEnum)(common_constants_1.Role),
    __metadata("design:type", String)
], CreateRolesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRolesDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the role',
        default: true,
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRolesDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List id of permissions actions',
        example: [common_constants_1.PermissionActions.EXPORT_USER_LIST],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRolesDto.prototype, "permissions", void 0);
//# sourceMappingURL=create-roles.dto.js.map
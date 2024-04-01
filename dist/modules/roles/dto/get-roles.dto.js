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
exports.GetRolesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/pagination.dto");
const common_constants_1 = require("../../../common/common.constants");
class GetRolesDto extends pagination_dto_1.CommonPaginationDto {
}
exports.GetRolesDto = GetRolesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'find with _id ||  name',
        required: false,
    }),
    __metadata("design:type", String)
], GetRolesDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.values(common_constants_1.ActiveStatus),
        required: false,
    }),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRolesDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'name_asc',
        description: 'support id and name field',
        required: false,
        default: 'name_asc',
    }),
    __metadata("design:type", String)
], GetRolesDto.prototype, "sortBy", void 0);
//# sourceMappingURL=get-roles.dto.js.map
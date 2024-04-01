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
exports.exportUserCsvDto = exports.GetUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/pagination.dto");
const common_constants_1 = require("../../../common/common.constants");
const class_transformer_1 = require("class-transformer");
class GetUserDto extends pagination_dto_1.CommonPaginationDto {
}
exports.GetUserDto = GetUserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'find with _id || email || phone and fullname',
        required: false,
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.values(common_constants_1.TypeStatus),
        required: false,
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUserDto.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'joinDate_asc or joinDate_desc',
        description: 'support all field',
        required: false,
    }),
    __metadata("design:type", String)
], GetUserDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: common_constants_1.Role,
        isArray: true,
        default: [],
        example: common_constants_1.Role.Agent,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_constants_1.Role, { each: true }),
    __metadata("design:type", Array)
], GetUserDto.prototype, "role", void 0);
class exportUserCsvDto {
}
exports.exportUserCsvDto = exportUserCsvDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], exportUserCsvDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], exportUserCsvDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '62f49db316a173d4a99135c4',
        description: 'find with _id || email || phone and fullname',
    }),
    __metadata("design:type", String)
], exportUserCsvDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Object.values(common_constants_1.TypeStatus) }),
    __metadata("design:type", String)
], exportUserCsvDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'joinDate_asc or joinDate_desc',
        description: 'support all field',
    }),
    __metadata("design:type", String)
], exportUserCsvDto.prototype, "sortBy", void 0);
//# sourceMappingURL=get-users.dto.js.map
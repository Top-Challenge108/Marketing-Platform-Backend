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
exports.QueryCommonDto = exports.PermissionDto = exports.HeaderDto = exports.ResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_constants_1 = require("./common.constants");
const pagination_dto_1 = require("./pagination.dto");
class ResponseDto {
}
exports.ResponseDto = ResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    __metadata("design:type", Number)
], ResponseDto.prototype, "statusCode", void 0);
class HeaderDto {
}
exports.HeaderDto = HeaderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: common_constants_1.LanguageCode.United_States,
        required: false,
        default: common_constants_1.LanguageCode.United_States,
    }),
    (0, class_validator_1.IsEnum)(common_constants_1.LanguageCode),
    __metadata("design:type", String)
], HeaderDto.prototype, "lang", void 0);
class PermissionDto {
}
exports.PermissionDto = PermissionDto;
class QueryCommonDto extends pagination_dto_1.CommonPaginationDto {
}
exports.QueryCommonDto = QueryCommonDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QueryCommonDto.prototype, "sortBy", void 0);
//# sourceMappingURL=common.dto.js.map
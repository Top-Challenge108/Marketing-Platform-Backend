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
exports.SearchSortDto = exports.PaginationResDto = exports.CommonPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CommonPaginationDto {
}
exports.CommonPaginationDto = CommonPaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], CommonPaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], CommonPaginationDto.prototype, "limit", void 0);
class PaginationResDto {
}
exports.PaginationResDto = PaginationResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    __metadata("design:type", Number)
], PaginationResDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    __metadata("design:type", Number)
], PaginationResDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 10 }),
    __metadata("design:type", Number)
], PaginationResDto.prototype, "limit", void 0);
class SearchSortDto extends CommonPaginationDto {
}
exports.SearchSortDto = SearchSortDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchSortDto.prototype, "keywords", void 0);
//# sourceMappingURL=pagination.dto.js.map
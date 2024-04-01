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
exports.EditUserInfoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class EditUserInfoDto {
}
exports.EditUserInfoDto = EditUserInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'Nguyen Van',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim(); }),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'A',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim(); }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0123456789',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim(); }),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EditUserInfoDto.prototype, "bio", void 0);
//# sourceMappingURL=edit-user-info.dto.js.map
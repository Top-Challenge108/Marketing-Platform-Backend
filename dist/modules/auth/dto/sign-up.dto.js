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
exports.ResponseSignUpDto = exports.SignUpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_dto_1 = require("../../../common/common.dto");
const common_constants_1 = require("../../../common/common.constants");
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'girs@gmail.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase(); }),
    (0, class_validator_1.Matches)(/^([^@\s\."'<>\(\)\[\]\{\}\\/,:;]+\.)*[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+@[^@\s\._"'<>\(\)\[\]\{\}\\/,:;]+(\.[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+)+$/m, {
        message: 'This must be an email',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0123456789',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim(); }),
    __metadata("design:type", String)
], SignUpDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'c3RyaW5n',
    }),
    (0, class_validator_1.IsBase64)({}),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: common_constants_1.Role,
        default: common_constants_1.Role.Agent,
        example: common_constants_1.Role.Agent,
    }),
    (0, class_validator_1.IsEnum)(common_constants_1.Role),
    __metadata("design:type", String)
], SignUpDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ChIJIaGbBBhawokRUmbgNsUmr-s',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "placeId", void 0);
class ResponseSignUpDto extends common_dto_1.ResponseDto {
}
exports.ResponseSignUpDto = ResponseSignUpDto;
//# sourceMappingURL=sign-up.dto.js.map
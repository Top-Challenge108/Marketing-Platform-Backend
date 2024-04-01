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
exports.ResponseLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_response_dto_1 = require("../../../modules/user/dto/user-response.dto");
class UserInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_response_dto_1.UserResponseDto }),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], UserInfoDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfoDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfoDto.prototype, "refreshToken", void 0);
class ResponseLoginDto {
}
exports.ResponseLoginDto = ResponseLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResponseLoginDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseLoginDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserInfoDto }),
    __metadata("design:type", Object)
], ResponseLoginDto.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], ResponseLoginDto.prototype, "statusCode", void 0);
//# sourceMappingURL=response-login.dto.js.map
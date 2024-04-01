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
exports.PutObjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PutObjectDto {
}
exports.PutObjectDto = PutObjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'test.jpg',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim(); }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PutObjectDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'rcd',
        default: 'r',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(8),
    (0, class_transformer_1.Transform)((data) => { var _a; return (_a = data.value) === null || _a === void 0 ? void 0 : _a.trim(); }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PutObjectDto.prototype, "permissions", void 0);
//# sourceMappingURL=put-object.dto.js.map
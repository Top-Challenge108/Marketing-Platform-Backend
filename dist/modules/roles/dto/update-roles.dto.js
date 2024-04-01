"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRolesDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_roles_dto_1 = require("./create-roles.dto");
class UpdateRolesDto extends (0, mapped_types_1.PartialType)(create_roles_dto_1.CreateRolesDto) {
}
exports.UpdateRolesDto = UpdateRolesDto;
//# sourceMappingURL=update-roles.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_permissions_dto_1 = require("./create-permissions.dto");
class UpdatePermissionsDto extends (0, mapped_types_1.PartialType)(create_permissions_dto_1.CreatePermissionsDto) {
}
exports.UpdatePermissionsDto = UpdatePermissionsDto;
//# sourceMappingURL=update-permissions.dto.js.map
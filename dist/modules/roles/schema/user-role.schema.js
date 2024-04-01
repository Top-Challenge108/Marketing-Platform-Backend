"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLE_MODEL = exports.UserRoleSchema = void 0;
const mongoose = require("mongoose");
const helpers_1 = require("../../../common/helpers");
const USER_ROLE_MODEL = 'user-roles';
exports.USER_ROLE_MODEL = USER_ROLE_MODEL;
const UserRoleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'roles',
    },
}, {
    timestamps: true,
});
exports.UserRoleSchema = UserRoleSchema;
UserRoleSchema.plugin(helpers_1.paginate);
UserRoleSchema.plugin(helpers_1.mongooseAggregatePaginate);
//# sourceMappingURL=user-role.schema.js.map
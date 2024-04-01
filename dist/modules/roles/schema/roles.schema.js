"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesSchema = exports.ROLES_MODEL = void 0;
const mongoose = require("mongoose");
const helpers_1 = require("../../../common/helpers");
const common_constants_1 = require("../../../common/common.constants");
const ROLES_MODEL = 'roles';
exports.ROLES_MODEL = ROLES_MODEL;
const RolesSchema = new mongoose.Schema({
    name: {
        require: true,
        unique: true,
        type: String,
        enum: common_constants_1.Role,
    },
    description: {
        require: false,
        type: String,
    },
    active: {
        require: true,
        type: Boolean,
        default: true,
    },
    permissions: [
        {
            type: String,
        },
    ],
}, { timestamps: true });
exports.RolesSchema = RolesSchema;
RolesSchema.plugin(helpers_1.paginate);
RolesSchema.plugin(helpers_1.mongooseAggregatePaginate);
//# sourceMappingURL=roles.schema.js.map
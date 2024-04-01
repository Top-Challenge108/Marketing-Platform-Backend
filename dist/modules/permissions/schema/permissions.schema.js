"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsSchema = exports.PERMISSIONS_MODEL = void 0;
const mongoose = require("mongoose");
const helpers_1 = require("../../../common/helpers");
const PERMISSIONS_MODEL = 'permissions';
exports.PERMISSIONS_MODEL = PERMISSIONS_MODEL;
const PermissionsSchema = new mongoose.Schema({
    action: {
        require: true,
        type: String,
    },
    description: {
        require: false,
        type: String,
    },
}, { timestamps: true });
exports.PermissionsSchema = PermissionsSchema;
PermissionsSchema.plugin(helpers_1.paginate);
PermissionsSchema.plugin(helpers_1.mongooseAggregatePaginate);
//# sourceMappingURL=permissions.schema.js.map
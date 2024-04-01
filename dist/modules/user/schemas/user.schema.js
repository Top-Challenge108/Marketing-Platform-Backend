"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_MODEL = exports.UserSchema = void 0;
const mongoose = require("mongoose");
const common_constants_1 = require("../../../common/common.constants");
const helpers_1 = require("../../../common/helpers");
const USER_MODEL = 'users';
exports.USER_MODEL = USER_MODEL;
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        sparse: true,
    },
    avatar: String,
    password: String,
    firstName: {
        type: String,
        default: '',
        required: false,
    },
    lastName: {
        type: String,
        required: false,
        default: '',
    },
    phone: {
        type: String,
        required: false,
        sparse: true,
    },
    status: {
        type: String,
        enum: Object.values(common_constants_1.TypeStatus),
        default: common_constants_1.TypeStatus.ACTIVE,
    },
    joinDate: {
        type: Date,
        default: new Date(),
    },
    dob: {
        required: false,
        type: Date,
        default: null,
    },
    citizenship: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: null,
    },
    salt: String,
    lastUpdatePassword: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    language: {
        type: String,
        enum: common_constants_1.LanguageCode,
    },
    website: {
        type: String,
    },
    bio: {
        type: String,
    },
    locationId: {
        type: mongoose.Types.ObjectId,
        ref: 'locations',
    },
    company: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.UserSchema = UserSchema;
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});
UserSchema.plugin(helpers_1.paginate);
UserSchema.plugin(helpers_1.mongooseAggregatePaginate);
//# sourceMappingURL=user.schema.js.map
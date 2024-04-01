/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from 'mongoose';
import { TypeStatus } from '../../../common/common.constants';
declare const USER_MODEL = "users";
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: TypeStatus;
    joinDate: Date;
    citizenship: string;
    gender: string;
    avatar?: string;
    password?: string;
    salt?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dob?: Date;
    lastUpdatePassword?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    language?: string;
    website?: string;
    bio?: string;
    locationId?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
    company?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: TypeStatus;
    joinDate: Date;
    citizenship: string;
    gender: string;
    avatar?: string;
    password?: string;
    salt?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dob?: Date;
    lastUpdatePassword?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    language?: string;
    website?: string;
    bio?: string;
    locationId?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
    company?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: TypeStatus;
    joinDate: Date;
    citizenship: string;
    gender: string;
    avatar?: string;
    password?: string;
    salt?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dob?: Date;
    lastUpdatePassword?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    language?: string;
    website?: string;
    bio?: string;
    locationId?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
    company?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export { UserSchema, USER_MODEL };

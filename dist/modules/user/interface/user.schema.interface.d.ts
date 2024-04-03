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
/// <reference types="mongoose/types" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Document } from 'mongoose';
export interface IUser {
    _id: mongoose.Types.ObjectId;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone: string;
    status: string;
    joinDate: string;
    dob?: Date;
    gender: string;
    roles: string[];
    salt?: string;
    lastUpdatePassword?: Date;
    createdAt: Date;
    updatedAt: Date;
    permissions?: string[];
    role: string;
    language: string;
    avatar: string;
    company?: string;
    bio?: string;
    website?: string;
    locationId: mongoose.Types.ObjectId;
}
export interface ICreateUser {
    email?: string;
    phone?: string;
    status: string;
    salt: string;
    password: string;
    language: string;
    country?: string;
    role?: string;
    locationId: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    bio?: string;
    website?: string;
    company?: string;
}
export type UserDocument = IUser & Document;

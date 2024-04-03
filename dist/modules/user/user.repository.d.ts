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
import { Model } from 'mongoose';
import { UserDocument } from './interface/user.schema.interface';
import { UserRepositoryInterface } from './interface/user.repository.interface';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { GetUserDto } from './dto/get-users.dto';
import { UserActiveDto } from './dto/user-active.dto';
export declare class UserRepository extends BaseAbstractRepository<UserDocument> implements UserRepositoryInterface {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findUserActive(userActiveDto: UserActiveDto): Promise<any>;
    getUsersActive(getUserDto: GetUserDto): Promise<any>;
}

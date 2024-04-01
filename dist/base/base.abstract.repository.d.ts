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
import { BaseInterfaceRepository } from './base.interface.repository';
import { Model } from 'mongoose';
import { CommonPaginationDto } from '../common/pagination.dto';
import { QueryCommonDto } from '../common/common.dto';
export declare abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private model;
    protected constructor(model: Model<T>);
    findOneAndDelete(filter: any, options?: any): import("mongoose").Query<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOneAndDelete">;
    create(data: T | any): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>>;
    insertMany(docs: Array<T> | any, options?: T | any | null): Promise<import("mongoose").Require_id<T>[]>;
    updateOne(filter: T | any, data: T | any, options?: T | any | null): import("mongoose").Query<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOneAndUpdate">;
    updateMany(filter: T | any, data: T | any, options?: T | any | null): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "updateMany">;
    findOne(filter: T | any): import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOne">;
    findAll(filter?: T | any | null, projection?: T | null): import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>[], import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "find">;
    deleteOne(filter: T | any, projection?: T | null): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "deleteOne">;
    deleteMany(filter: T | any, options?: T | any): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "deleteMany">;
    findByIdAndDelete(id: string, options?: T | any): import("mongoose").Query<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOneAndDelete">;
    findByIdAndUpdate(id: string, update: T | any, options?: T | any): import("mongoose").Query<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOneAndUpdate">;
    findOneAndUpdate(filter: T | any, update: T | any, options?: T | any): import("mongoose").Query<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOneAndUpdate">;
    findById(id: string, filter?: T | any, options?: T | any): import("mongoose").Query<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}, T, "findOne">;
    aggregate(pipeline: T | any, options?: T | any): import("mongoose").Aggregate<any[]>;
    populate(docs: Array<T>, options?: T | any): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>[]>;
    paginate(filter: T | any, options: T | any): Promise<CommonPaginationDto>;
    aggregatePaginate(filter: T | any, options: T | any): Promise<CommonPaginationDto>;
    queryList(queryCommonDto: QueryCommonDto | any, options: any, query?: {}, listQuery?: string[]): Promise<any>;
    queryListAggregate(queryCommonDto: QueryCommonDto | any, options: any, query: object[], listQuery?: string[], match?: {}): Promise<CommonPaginationDto>;
    private filterAggregateSelect;
    private filterQuery;
    private isIdOject;
    private mergeSort;
    private regexKeyword;
}

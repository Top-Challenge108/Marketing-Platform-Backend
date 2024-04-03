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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { IdsDto } from './dto/ids.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { IDRoleDto } from './dto/id-role-dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRolesDto: CreateRolesDto): Promise<import("mongoose").Document<unknown, {}, import("src/modules/roles/roles.interface").IRolesDoc> & import("mongoose").Document<any, any, any> & import("src/modules/roles/roles.interface").IRoles & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllPermissions(idsDto: IdsDto): Promise<string[]>;
    getRoles(getRolesDto: GetRolesDto): Promise<any>;
    findOne(iDRoleDto: IDRoleDto): Promise<any>;
    update(id: string, updateRolesDto: UpdateRolesDto): Promise<{
        name: string;
        description?: string;
        active?: boolean;
        permissions: string[];
        _id: any;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<import("src/modules/roles/roles.interface").IRolesDoc, keyof Paths> & Paths;
        $clone: () => import("src/modules/roles/roles.interface").IRolesDoc;
        $getAllSubdocs: () => import("mongoose").Document<any, any, any>[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document<any, any, any>[];
        $inc: (path: string | string[], val?: number) => import("src/modules/roles/roles.interface").IRolesDoc;
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType_1 = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType_1;
        };
        $op: "save" | "validate" | "remove";
        $session: (session?: import("mongodb").ClientSession) => import("mongodb").ClientSession;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (value: string | Record<string, any>): import("src/modules/roles/roles.interface").IRolesDoc;
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions<unknown>) => any;
        depopulate: (path?: string | string[]) => import("src/modules/roles/roles.interface").IRolesDoc;
        directModifiedPaths: () => string[];
        equals: (doc: import("mongoose").Document<any, any, any>) => boolean;
        errors?: import("mongoose").Error.ValidationError;
        get: {
            <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => import("mongoose").UpdateQuery<import("src/modules/roles/roles.interface").IRolesDoc>;
        id?: any;
        increment: () => import("src/modules/roles/roles.interface").IRolesDoc;
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("src/modules/roles/roles.interface").IRolesDoc;
        invalidate: {
            <T_1 extends string | number | symbol>(path: T_1, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
        };
        isDirectModified: {
            <T_2 extends string | number | symbol>(path: T_2 | T_2[]): boolean;
            (path: string | string[]): boolean;
        };
        isDirectSelected: {
            <T_3 extends string | number | symbol>(path: T_3): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T_4 extends string | number | symbol>(path: T_4): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T_5 extends string | number | symbol>(path?: T_5 | T_5[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
            (path?: string | string[], options?: {
                ignoreAtomics?: boolean;
            }): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T_6 extends string | number | symbol>(path: T_6): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T_7 extends string | number | symbol>(path: T_7, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType_2 = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_2;
            <ModelType_3 = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType_3;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => string[];
        overwrite: (obj: import("mongoose").AnyObject) => import("src/modules/roles/roles.interface").IRolesDoc;
        $parent: () => import("mongoose").Document<any, any, any>;
        populate: {
            <Paths_1 = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("src/modules/roles/roles.interface").IRolesDoc, Paths_1>>;
            <Paths_2 = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any, {}, {}, {}, any, any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("src/modules/roles/roles.interface").IRolesDoc, Paths_2>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, import("src/modules/roles/roles.interface").IRolesDoc, {}, import("src/modules/roles/roles.interface").IRolesDoc, "find">;
        save: (options?: import("mongoose").SaveOptions) => Promise<import("src/modules/roles/roles.interface").IRolesDoc>;
        schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: unknown;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: string]: unknown;
        }>> & import("mongoose").FlatRecord<{
            [x: string]: unknown;
        }> & Required<{
            _id: unknown;
        }>>>;
        set: {
            <T_8 extends string | number | symbol>(path: T_8, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (value: string | Record<string, any>): import("src/modules/roles/roles.interface").IRolesDoc;
        };
        toJSON: {
            <T_9 = any>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T_9>;
            <T_10 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_10;
        };
        toObject: <T_11 = any>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => import("mongoose").Require_id<T_11>;
        unmarkModified: {
            <T_12 extends string | number | symbol>(path: T_12): void;
            (path: string): void;
        };
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("src/modules/roles/roles.interface").IRolesDoc>, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, import("src/modules/roles/roles.interface").IRolesDoc, {}, import("src/modules/roles/roles.interface").IRolesDoc, "find">;
        validate: {
            <T_13 extends string | number | symbol>(pathsToValidate?: T_13 | T_13[], options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): import("mongoose").Error.ValidationError;
            <T_14 extends string | number | symbol>(pathsToValidate?: T_14 | T_14[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
        };
        status?: string;
    }>;
    deleteUser(addUserRoleDto: AddUserRoleDto): Promise<import("mongodb").DeleteResult>;
    remove(id: string): Promise<void>;
    addUser(addUserRoleDto: AddUserRoleDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
}

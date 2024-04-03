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
import mongoose from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { IdsDto } from './dto/ids.dto';
import { IDRoleDto } from './dto/id-role-dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { RolesRepository } from './roles.repository';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { UserRoleRepository } from './user-role.repository';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { IUserRole } from './user-role.interface';
import { UserService } from '../user/user.service';
export declare class RolesService extends BaseAbstractService {
    private readonly rolesRepository;
    private readonly userRoleRepository;
    private readonly userService;
    constructor(rolesRepository: RolesRepository, userRoleRepository: UserRoleRepository, i18nService: I18nService, userService: UserService);
    checkUserExist(userId: string, roleId: string): Promise<mongoose.Document<unknown, {}, import("./user-role.interface").IUserRoleDoc> & mongoose.Document<any, any, any> & IUserRole & {
        _id: mongoose.Types.ObjectId;
    }>;
    create(createRolesDto: CreateRolesDto): Promise<mongoose.Document<unknown, {}, import("src/modules/roles/roles.interface").IRolesDoc> & mongoose.Document<any, any, any> & import("src/modules/roles/roles.interface").IRoles & {
        _id: mongoose.Types.ObjectId;
    }>;
    getAllPermissions(idsDto: IdsDto): Promise<string[]>;
    findOne(idRoleDto: IDRoleDto): Promise<any>;
    getRoles(getRolesDto: GetRolesDto): Promise<any>;
    update(id: string, updateRolesDto: UpdateRolesDto): Promise<{
        _id: any;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<import("src/modules/roles/roles.interface").IRolesDoc, keyof Paths> & Paths;
        $clone: () => import("src/modules/roles/roles.interface").IRolesDoc;
        $getAllSubdocs: () => mongoose.Document<any, any, any>[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => mongoose.Document<any, any, any>[];
        $inc: (path: string | string[], val?: number) => import("src/modules/roles/roles.interface").IRolesDoc;
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: Record<string, unknown>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = mongoose.Model<unknown, {}, {}, {}, mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType_1 = mongoose.Model<any, {}, {}, {}, any, any>>(): ModelType_1;
        };
        $op: "save" | "validate" | "remove";
        $session: (session?: any) => any;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: mongoose.DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (path: string | Record<string, any>, val: any, options?: mongoose.DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (value: string | Record<string, any>): import("src/modules/roles/roles.interface").IRolesDoc;
        };
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection<mongodb.Document>;
        db: mongoose.Connection;
        deleteOne: (options?: mongoose.QueryOptions<unknown>) => any;
        depopulate: (path?: string | string[]) => import("src/modules/roles/roles.interface").IRolesDoc;
        directModifiedPaths: () => string[];
        equals: (doc: mongoose.Document<any, any, any>) => boolean;
        errors?: mongoose.Error.ValidationError;
        get: {
            <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => mongoose.UpdateQuery<import("src/modules/roles/roles.interface").IRolesDoc>;
        id?: any;
        increment: () => import("src/modules/roles/roles.interface").IRolesDoc;
        init: (obj: mongoose.AnyObject, opts?: mongoose.AnyObject) => import("src/modules/roles/roles.interface").IRolesDoc;
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
            <ModelType_2 = mongoose.Model<unknown, {}, {}, {}, mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_2;
            <ModelType_3 = mongoose.Model<any, {}, {}, {}, any, any>>(): ModelType_3;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => string[];
        overwrite: (obj: mongoose.AnyObject) => import("src/modules/roles/roles.interface").IRolesDoc;
        $parent: () => mongoose.Document<any, any, any>;
        populate: {
            <Paths_1 = {}>(path: string | mongoose.PopulateOptions | (string | mongoose.PopulateOptions)[]): Promise<mongoose.MergeType<import("src/modules/roles/roles.interface").IRolesDoc, Paths_1>>;
            <Paths_2 = {}>(path: string, select?: string | mongoose.AnyObject, model?: mongoose.Model<any, {}, {}, {}, any, any>, match?: mongoose.AnyObject, options?: mongoose.PopulateOptions): Promise<mongoose.MergeType<import("src/modules/roles/roles.interface").IRolesDoc, Paths_2>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: mongoose.AnyObject, options?: mongoose.QueryOptions<unknown>) => mongoose.Query<any, import("src/modules/roles/roles.interface").IRolesDoc, {}, import("src/modules/roles/roles.interface").IRolesDoc, "find">;
        save: (options?: mongoose.SaveOptions) => Promise<import("src/modules/roles/roles.interface").IRolesDoc>;
        schema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            [x: string]: unknown;
        }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            [x: string]: unknown;
        }>> & mongoose.FlatRecord<{
            [x: string]: unknown;
        }> & Required<{
            _id: unknown;
        }>>;
        set: {
            <T_8 extends string | number | symbol>(path: T_8, val: any, type: any, options?: mongoose.DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (path: string | Record<string, any>, val: any, type: any, options?: mongoose.DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (path: string | Record<string, any>, val: any, options?: mongoose.DocumentSetOptions): import("src/modules/roles/roles.interface").IRolesDoc;
            (value: string | Record<string, any>): import("src/modules/roles/roles.interface").IRolesDoc;
        };
        toJSON: {
            <T_9 = any>(options?: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): mongoose.FlattenMaps<T_9>;
            <T_10 = any>(options: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_10;
        };
        toObject: <T_11 = any>(options?: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => mongoose.Require_id<T_11>;
        unmarkModified: {
            <T_12 extends string | number | symbol>(path: T_12): void;
            (path: string): void;
        };
        updateOne: (update?: mongoose.UpdateWithAggregationPipeline | mongoose.UpdateQuery<import("src/modules/roles/roles.interface").IRolesDoc>, options?: mongoose.QueryOptions<unknown>) => mongoose.Query<any, import("src/modules/roles/roles.interface").IRolesDoc, {}, import("src/modules/roles/roles.interface").IRolesDoc, "find">;
        validate: {
            <T_13 extends string | number | symbol>(pathsToValidate?: T_13 | T_13[], options?: mongoose.AnyObject): Promise<void>;
            (pathsToValidate?: mongoose.PathsToValidate, options?: mongoose.AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: mongoose.pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: mongoose.pathsToSkip;
            }): mongoose.Error.ValidationError;
            <T_14 extends string | number | symbol>(pathsToValidate?: T_14 | T_14[], options?: mongoose.AnyObject): mongoose.Error.ValidationError;
            (pathsToValidate?: mongoose.PathsToValidate, options?: mongoose.AnyObject): mongoose.Error.ValidationError;
        };
        name: string;
        description?: string;
        status?: string;
        permissions: string[];
    }>;
    remove(id: string): Promise<void>;
    paginate(getRolesDto: GetRolesDto): Promise<{
        success: boolean;
        message: any;
        result: object;
        statusCode: number;
    }>;
    mapGetUserId(users: IUserRole[]): string[];
    mapCreateUserRole(userIds: string[], roleId: string): {
        userId: string;
        roleId: string;
    }[];
    createUserRole(addUserRoleDto: AddUserRoleDto): Promise<{
        success: boolean;
        message: any;
        result: object;
        statusCode: number;
    }>;
    removeUserRoles(addUserRoleDto: AddUserRoleDto): Promise<mongodb.DeleteResult>;
    getRoleByName(name: string): Promise<mongoose.Document<unknown, {}, import("src/modules/roles/roles.interface").IRolesDoc> & mongoose.Document<any, any, any> & import("src/modules/roles/roles.interface").IRoles & {
        _id: mongoose.Types.ObjectId;
    }>;
}

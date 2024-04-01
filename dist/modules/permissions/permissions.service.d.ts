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
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { PermissionsRepository } from './permissions.repository';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { GetPermissionsDto } from './dto/get-permissions.dto';
export declare class PermissionsService extends BaseAbstractService {
    private readonly permissionsRepository;
    constructor(permissionsRepository: PermissionsRepository, i18nService: I18nService);
    create(createPermissionsDto: CreatePermissionsDto): Promise<import("mongoose").Document<unknown, {}, import("./permissions.interface").IPermissionsDoc> & import("mongoose").Document<any, any, any> & import("./permissions.interface").IPermissions & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPermissions(getRolesDto: GetPermissionsDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./permissions.interface").IPermissionsDoc> & import("mongoose").Document<any, any, any> & import("./permissions.interface").IPermissions & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updatePermissionsDto: UpdatePermissionsDto): Promise<import("mongoose").FlattenMaps<import("./permissions.interface").IPermissionsDoc> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<void>;
    paginate(getPermissionsDto: GetPermissionsDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
}

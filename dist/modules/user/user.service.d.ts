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
import mongoose from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { IDDto } from './dto/id.dto';
import { ICreateUser, IUser } from './interface/user.schema.interface';
import { UserRepository } from './user.repository';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { GetUserDto } from './dto/get-users.dto';
import { EditUserInfoDto } from './dto/edit-user-info.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import { SearchSortDto } from '../../common/pagination.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RolesService } from '../roles/roles.service';
import { UserActiveDto } from './dto/user-active.dto';
import { LanguageService } from '../language/language.service';
import { PutObjectDto } from './dto/put-object.dto';
import { TokenService } from '../auth/token.service';
import { LocationService } from '../location/location.service';
export declare class UserService extends BaseAbstractService {
    private readonly userRepository;
    private readonly rolesService;
    private readonly languageService;
    private readonly tokenService;
    private readonly locationService;
    constructor(userRepository: UserRepository, i18nService: I18nService, rolesService: RolesService, languageService: LanguageService, tokenService: TokenService, locationService: LocationService);
    hashPassword(password: string): Promise<{
        salt: string;
        hashPassword: string;
    }>;
    findUserByEmail(email: string): Promise<IUser>;
    findUserByGoogleId(googleId: string): Promise<IUser>;
    changePassword(user: IJwtPayload, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    getUsers(getUserDto: GetUserDto): Promise<any>;
    getUsersArg(getUserDto: GetUserDto): Promise<any>;
    findOneById(_id: string): Promise<IUser>;
    create(createTodoDto: any): Promise<IUser>;
    updateOneById(_id: string, updateOneTodoDto: any): Promise<mongoose.ModifyResult<import("./interface/user.schema.interface").UserDocument>>;
    deleteOneById(_id: string): Promise<mongoose.mongo.DeleteResult>;
    getProfile(user: IJwtPayload): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    getUserInformationById(id: string): Promise<IUser>;
    getUserInformation(iddto: IDDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    paginate(getUserDto: GetUserDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    aggregatePaginate(getUserDto: GetUserDto): Promise<import("../../common/pagination.dto").CommonPaginationDto>;
    getListUserActiveByRole(userActiveDto: UserActiveDto, lang: string): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    isValidDate(dob: any): boolean;
    editUserInformation(user: IJwtPayload, editUserInfoDto: EditUserInfoDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    changeUserStatus(user: any, idDto: IDDto, changeStatusDto: ChangeStatusDto): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    createUser(user: ICreateUser): Promise<IUser>;
    findUserByConditions(conditions: any): Promise<IUser>;
    getListUsersActive(lang: string, searchSortDto: SearchSortDto): Promise<any>;
    generateSasUrl(putObjectDto: PutObjectDto, id: string): Promise<object>;
    findByIds(ids: string[]): mongoose.Aggregate<any[]>;
}

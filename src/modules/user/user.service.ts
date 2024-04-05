import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  LanguageCode,
  PermissionActions,
  StatusCode,
  TypeStatus,
} from '../../common/common.constants';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { GetUserDto } from './dto/get-users.dto';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import {
  decodePassword,
  getSasUrl,
  validateSasPermission,
} from '../../common/helpers';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RolesService } from '../roles/roles.service';
import { LanguageService } from '../language/language.service';
import { PutObjectDto } from './dto/put-object.dto';
import { TokenService } from '../auth/token.service';
import { LocationService } from '../location/location.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ICreateUser } from './interface/user.schema.interface';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService extends BaseAbstractService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    i18nService: I18nService,
    private readonly rolesService: RolesService,
    private readonly languageService: LanguageService,
    private readonly tokenService: TokenService,
    private readonly locationService: LocationService,
  ) {
    super(i18nService);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return {
      salt,
      hashPassword,
    };
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async changePassword(
    user: IJwtPayload,
    changePasswordDto: ChangePasswordDto,
  ) {
    const { id, language } = user;
    const lang = language;
    const { oldPassword, newPassword, deviceId } = changePasswordDto;
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      const result = await this.formatOutputData(
        {
          key: `translate.USER_NOT_FOUND`,
          lang,
        },
        {
          data: null,
          statusCode: StatusCode.USER_NOT_FOUND,
        },
      );

      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }
    const checkPassword = await bcrypt.compare(
      decodePassword(oldPassword),
      userData.password,
    );
    const decodePass = decodePassword(newPassword);

    if (!checkPassword) {
      const result = await this.formatOutputData(
        {
          key: `translate.WRONG_PASSWORD`,
          lang,
        },
        {
          data: null,
          statusCode: StatusCode.WRONG_PASSWORD,
        },
      );

      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    const checkSamePassword = await bcrypt.compare(
      decodePass,
      userData.password,
    );
    if (checkSamePassword) {
      const result = await this.formatOutputData(
        {
          key: `translate.NEW_PASSWORD_SAME_OLD_PASSWORD`,
          lang,
        },
        {
          data: null,
          statusCode: StatusCode.NEW_PASSWORD_SAME_OLD_PASSWORD,
        },
      );

      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await this.hashPassword(decodePass);
    userData.password = hashPassword.hashPassword;
    userData.salt = hashPassword.salt;
    userData.lastUpdatePassword = new Date();
    await this.userRepository.save(userData);
    const newToken = await this.tokenService.createTokenLogin(
      userData.id.toString(),
      deviceId,
    );

    return this.formatOutputData(
      {
        key: `translate.CHANGE_PASSWORD_SUCCESSFULLY`,
        lang,
      },
      {
        data: newToken,
        statusCode: StatusCode.CHANGE_PASSWORD_SUCCESSFULLY,
      },
    );
  }

  async getUsers(getUserDto: GetUserDto): Promise<any> {
    const { sortBy } = getUserDto;
    // const queryParam = ['_id', 'fullName', 'email', 'phone'];
    const options = {
      select:
        'email firstName lastName phone status joinDate location company locationId',
    };
    if (!sortBy) {
      getUserDto.sortBy = 'joinDate_asc';
    }
    if (getUserDto?.sortBy?.split('_')[0] === 'fullName') {
      options['sort'] = {
        firstName: getUserDto?.sortBy?.split('_')[1],
        lastName: getUserDto?.sortBy?.split('_')[1],
      };
    }
    const conditions = {};
    switch (getUserDto?.status) {
      case TypeStatus.ACTIVE: {
        conditions['status'] = TypeStatus.ACTIVE;
        break;
      }
      case TypeStatus.DEACTIVATED: {
        conditions['status'] = TypeStatus.DEACTIVATED;
        break;
      }
    }
    options['sort'] = { ...options['sort'], createdAt: 'asc' };
    // const users = await this.userRepository.find(
    //   getUserDto,
    //   options,
    //   conditions,
    //   queryParam,
    // );
    // return this.formatOutputData(
    //   {
    //     key: users
    //       ? `translate.GET_LIST_USERS_SUCCESSFULLY`
    //       : `translate.GET_LIST_USERS_FAIL`,
    //     lang: LanguageCode.United_States,
    //   },
    //   {
    //     statusCode: users
    //       ? StatusCode.GET_LIST_USERS_SUCCESSFULLY
    //       : StatusCode.GET_LIST_USERS_FAIL,
    //     data: users,
    //   },
    // );
    return null;
  }

  //   async getUsersArg(getUserDto: GetUserDto): Promise<any> {
  //     const { placeId, sortBy, status, role } = getUserDto;
  //     const queryParam = ['_id', 'fullName', 'email', 'phone'];
  //     const options = {
  //       select:
  //         'email firstName lastName phone status joinDate location company locationId role avatar fullName website bio',
  //     };
  //     const match = {};
  //     if (!sortBy) {
  //       getUserDto.sortBy = 'joinDate_asc';
  //     }
  //     if (status) {
  //       match['status'] = status;
  //     }
  //     const query: any = [
  //       {
  //         $lookup: {
  //           from: 'locations',
  //           localField: 'locationId',
  //           foreignField: '_id',
  //           as: 'location',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'user-roles',
  //           localField: '_id',
  //           foreignField: 'userId',
  //           as: 'roles',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'roles',
  //           localField: 'roles.roleId',
  //           foreignField: '_id',
  //           as: 'role',
  //         },
  //       },
  //     ];
  //     if (role) {
  //       match['role.name'] =
  //         typeof role === 'string' ? { $in: [role] } : { $in: role };
  //     }
  //     if (placeId) {
  //       const locationData = await getPlaceDetails(placeId);
  //       if (!locationData) {
  //         const response = await this.formatOutputData(
  //           {
  //             key: `translate.PLACE_ID_IS_NOT_CORRECT`,
  //             lang: LanguageCode.United_States,
  //           },
  //           {
  //             statusCode: StatusCode.PLACE_ID_IS_NOT_CORRECT,
  //             data: null,
  //           },
  //         );
  //         throw new HttpException(response, HttpStatus.BAD_REQUEST);
  //       }
  //       match['location.location'] = {
  //         $geoWithin: {
  //           $centerSphere: [locationData.location, 20 / 6371],
  //         },
  //       };
  //     }
  //     if (getUserDto?.sortBy?.split('_')[0] === 'fullName') {
  //       options['sort'] = {
  //         firstName: getUserDto?.sortBy?.split('_')[1],
  //         lastName: getUserDto?.sortBy?.split('_')[1],
  //       };
  //     }
  //     options['sort'] = { ...options['sort'], createdAt: 'asc' };
  //     const users = await this.userRepository.queryListAggregate(
  //       getUserDto,
  //       options,
  //       query,
  //       queryParam,
  //       match,
  //     );
  //     for (let index = 0; index < users.data.length; index++) {
  //       const user = users.data[index];
  //       users.data[index].avatarUrl = !user.avatar
  //         ? ''
  //         : await getSasUrl(user.avatar, SasPermission.Read, user._id);
  //     }
  //     return this.formatOutputData(
  //       {
  //         key: users
  //           ? `translate.GET_LIST_USERS_SUCCESSFULLY`
  //           : `translate.GET_LIST_USERS_FAIL`,
  //         lang: LanguageCode.United_States,
  //       },
  //       {
  //         statusCode: users
  //           ? StatusCode.GET_LIST_USERS_SUCCESSFULLY
  //           : StatusCode.GET_LIST_USERS_FAIL,
  //         data: users,
  //       },
  //     );
  //   }

  async findOneById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createTodoDto: any): Promise<UserEntity> {
    return this.userRepository.save(createTodoDto);
  }

  async updateOneById(id: string, updateOneTodoDto: any) {
    return this.userRepository.upsert({ id }, updateOneTodoDto);
  }

  async deleteOneById(id: string) {
    return this.userRepository.softDelete({ id });
  }

  //   async getProfile(user: IJwtPayload) {
  //     const { id } = user;

  //     const outPutData = {
  //       key: `translate.GET_USER_INFORMATION_FAIL`,
  //       lang: LanguageCode.United_States,
  //       statusCode: StatusCode.GET_USER_INFORMATION_FAIL,
  //       data: null,
  //     };

  //     const userInfo = await this.userRepository
  //       .aggregate([
  //         {
  //           $lookup: {
  //             from: 'user-roles',
  //             localField: '_id',
  //             foreignField: 'userId',
  //             as: 'userRoles',
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: 'roles',
  //             localField: 'userRoles.roleId',
  //             foreignField: '_id',
  //             as: 'roles',
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: 'locations',
  //             localField: 'locationId',
  //             foreignField: '_id',
  //             as: 'location',
  //           },
  //         },
  //         {
  //           $project: {
  //             email: 1,
  //             firstName: 1,
  //             lastName: 1,
  //             phone: 1,
  //             status: 1,
  //             joinDate: 1,
  //             citizenship: 1,
  //             gender: 1,
  //             userRoles: 1,
  //             dob: 1,
  //             type: 1,
  //             roles: 1,
  //             language: 1,
  //             avatar: 1,
  //             role: 1,
  //             company: 1,
  //             location: 1,
  //             website: 1,
  //             bio: 1,
  //           },
  //         },
  //       ])
  //       .match({
  //         _id: new mongoose.Types.ObjectId(_id),
  //       });
  //     userInfo[0].userRoles = undefined;
  //     userInfo[0].avatar = !userInfo[0].avatar
  //       ? ''
  //       : await getSasUrl(userInfo[0].avatar, SasPermission.Read, _id);
  //     userInfo[0].location = !userInfo[0].location ? {} : userInfo[0].location[0];
  //     userInfo[0].language = LanguageCode.United_States;
  //     if (userInfo.length) {
  //       outPutData.key = `translate.GET_USER_INFORMATION_SUCCESS`;
  //       outPutData.statusCode = StatusCode.GET_USER_INFORMATION_SUCCESS;
  //       outPutData.data = {
  //         ...userInfo[0],
  //         roles: userInfo[0].roles.filter((role) => role.active === true),
  //       };
  //     }
  //     return this.formatOutputData(
  //       {
  //         key: outPutData.key,
  //         lang: outPutData.lang,
  //       },
  //       {
  //         statusCode: outPutData.statusCode,
  //         data: outPutData.data,
  //       },
  //     );
  //   }

  async getUserInformationById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['userRoles', 'userRoles.role', 'locations'],
    });

    return user;
  }

  //   async getUserInformation(iddto: IDDto) {
  //     const { id } = iddto;
  //     const outPutData = {
  //       key: `translate.USER_NOT_FOUND`,
  //       lang: LanguageCode.United_States,
  //       statusCode: StatusCode.USER_NOT_FOUND,
  //       data: null,
  //     };
  //     const userInfo = await this.userRepository
  //       .aggregate([
  //         {
  //           $lookup: {
  //             from: 'user-roles',
  //             localField: '_id',
  //             foreignField: 'userId',
  //             as: 'userRoles',
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: 'roles',
  //             localField: 'userRoles.roleId',
  //             foreignField: '_id',
  //             as: 'roles',
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: 'locations',
  //             localField: 'locationId',
  //             foreignField: '_id',
  //             as: 'location',
  //           },
  //         },
  //         {
  //           $project: {
  //             email: 1,
  //             firstName: 1,
  //             lastName: 1,
  //             phone: 1,
  //             status: 1,
  //             joinDate: 1,
  //             citizenship: 1,
  //             gender: 1,
  //             userRoles: 1,
  //             dob: 1,
  //             type: 1,
  //             roles: 1,
  //             avatar: 1,
  //             location: 1,
  //           },
  //         },
  //         { $unset: 'userRoles' },
  //       ])
  //       .match({
  //         _id: new mongoose.Types.ObjectId(id),
  //       });

  //     if (!userInfo.length) {
  //       const response = await this.formatOutputData(
  //         {
  //           key: outPutData.key,
  //           lang: outPutData.lang,
  //         },
  //         {
  //           statusCode: outPutData.statusCode,
  //           data: outPutData.data,
  //         },
  //       );
  //       throw new HttpException(response, HttpStatus.NOT_FOUND);
  //     }
  //     userInfo[0].avatar = !userInfo[0].avatar
  //       ? ''
  //       : await getSasUrl(userInfo[0].avatar, SasPermission.Read, id);
  //     userInfo[0].location = !userInfo[0].location ? {} : userInfo[0].location[0];
  //     outPutData.key = `translate.GET_USER_DETAILS_SUCCESS`;
  //     outPutData.statusCode = StatusCode.GET_USER_DETAILS_SUCCESS;
  //     outPutData.data = {
  //       ...userInfo[0],
  //     };

  //     return this.formatOutputData(
  //       {
  //         key: outPutData.key,
  //         lang: outPutData.lang,
  //       },
  //       {
  //         statusCode: outPutData.statusCode,
  //         data: outPutData.data,
  //       },
  //     );
  //   }

  //   async paginate(getUserDto: GetUserDto) {
  //     const { limit, page } = getUserDto;
  //     return this.formatOutputData(
  //       {
  //         key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
  //         lang: LanguageCode.Vn,
  //       },
  //       {
  //         statusCode: StatusCode.GET_LIST_USERS_SUCCESSFULLY,
  //         data: await this.userRepository.paginate(
  //           {
  //             /* query */
  //           },
  //           { limit, page },
  //         ),
  //       },
  //     );
  //   }

  //   async aggregatePaginate(getUserDto: GetUserDto) {
  //     const { limit, page } = getUserDto;
  //     return this.userRepository.aggregatePaginate(
  //       [
  //         /* query aggregate */
  //       ],
  //       { limit, page },
  //     );
  //   }

  //   async getListUserActiveByRole(userActiveDto: UserActiveDto, lang: string) {
  //     const { roleId } = userActiveDto;
  //     const result: any = await this.userRepository.findUserActive(userActiveDto);
  //     const users = result.data;

  //     for (let i = 0; i < users.length; i++) {
  //       const checkUserExist = await this.rolesService.checkUserExist(
  //         users[i]._id.toString(),
  //         roleId,
  //       );
  //       const user = {
  //         _id: users[i]._id,
  //         fullName: users[i].firstName.trim() + ' ' + users[i].lastName.trim(),
  //         status: users[i].status,
  //       };
  //       let isExist = true;
  //       if (!checkUserExist) {
  //         isExist = false;
  //       }
  //       users[i] = {
  //         ...user,
  //         isExist,
  //       };
  //     }
  //     result.data = users;

  //     return this.formatOutputData(
  //       {
  //         key: result
  //           ? `translate.GET_LIST_USERS_SUCCESSFULLY`
  //           : `translate.GET_LIST_USERS_FAIL`,
  //         lang: lang || LanguageCode.United_States,
  //       },
  //       {
  //         statusCode: result
  //           ? StatusCode.GET_LIST_USERS_SUCCESSFULLY
  //           : StatusCode.GET_LIST_USERS_FAIL,
  //         data: result,
  //       },
  //     );
  //   }

  isValidDate(dob) {
    if (!dob) {
      return true;
    }
    const arrayDate = dob.toString().split('-');
    if (arrayDate.length < 3) {
      return false;
    }
    const editDate = new Date(
      arrayDate[0],
      arrayDate[1] - 1,
      arrayDate[2].split('T')[0],
    );
    return arrayDate[1] == editDate.getMonth() + 1;
  }

  //   async editUserInformation(
  //     user: IJwtPayload,
  //     editUserInfoDto: EditUserInfoDto,
  //   ) {
  //     const { _id } = user;
  //     let locationId;
  //     const outPutData = {
  //       key: `translate.UPDATE_USER_INFORMATION_FAIL`,
  //       lang: LanguageCode.United_States,
  //       statusCode: StatusCode.UPDATE_USER_INFORMATION_FAIL,
  //       data: null,
  //     };
  //     const userExisted = await this.findOneById(_id);
  //     if (editUserInfoDto.placeId) {
  //       const location = await getPlaceDetails(editUserInfoDto.placeId);
  //       if (!location) {
  //         const response = await this.formatOutputData(
  //           {
  //             key: `translate.PLACE_ID_IS_NOT_CORRECT`,
  //             lang: LanguageCode.United_States,
  //           },
  //           {
  //             statusCode: StatusCode.PLACE_ID_IS_NOT_CORRECT,
  //             data: null,
  //           },
  //         );
  //         throw new HttpException(response, HttpStatus.BAD_REQUEST);
  //       }
  //       const locationData =
  //         await this.locationService.findAndCreateLocation(location);
  //       locationId = locationData._id;
  //     }
  //     const editUser = await this.userRepository.findByIdAndUpdate(_id, {
  //       ...editUserInfoDto,
  //       lastName: editUserInfoDto.lastName
  //         ? editUserInfoDto.lastName
  //         : userExisted.lastName,
  //       firstName: editUserInfoDto.firstName
  //         ? editUserInfoDto.firstName
  //         : userExisted.firstName,
  //       company: editUserInfoDto.company
  //         ? editUserInfoDto.company
  //         : userExisted.company,
  //       phone: editUserInfoDto.phone ? editUserInfoDto.phone : userExisted.phone,
  //       bio: editUserInfoDto.bio ? editUserInfoDto.bio : userExisted.bio,
  //       locationId: editUserInfoDto.placeId ? locationId : userExisted.locationId,
  //       avatar: editUserInfoDto.avatar
  //         ? editUserInfoDto.avatar
  //         : userExisted.avatar,
  //     });

  //     if (editUser) {
  //       outPutData.key = `translate.UPDATE_USER_INFORMATION_SUCCESS`;
  //       outPutData.statusCode = StatusCode.UPDATE_USER_INFORMATION_SUCCESS;
  //       outPutData.data = {};
  //     }

  //     return this.formatOutputData(
  //       {
  //         key: outPutData.key,
  //         lang: outPutData.lang,
  //       },
  //       {
  //         statusCode: outPutData.statusCode,
  //         data: outPutData.data,
  //       },
  //     );
  //   }

  //   async changeUserStatus(user, idDto: IDDto, changeStatusDto: ChangeStatusDto) {
  //     const { id } = idDto;
  //     const { language } = user;
  //     const lang = language;

  //     const outPutData = {
  //       key: `translate.UPDATE_USER_INFORMATION_FAIL`,
  //       lang: lang || LanguageCode.United_States,
  //       statusCode: StatusCode.UPDATE_USER_INFORMATION_FAIL,
  //       data: null,
  //     };
  //     try {
  //       if (user._id.toString() === id) {
  //         outPutData.key = `translate.USER_CANNOT_CHANGE_THEIR_STATUS`;
  //         outPutData.statusCode = StatusCode.USER_CANNOT_CHANGE_THEIR_STATUS;
  //         throw new BadRequestException();
  //       } else {
  //         const changeUser = await this.userRepository.findByIdAndUpdate(id, {
  //           ...changeStatusDto,
  //           lastUpdatePassword:
  //             changeStatusDto.status === TypeStatus.ACTIVE
  //               ? undefined
  //               : new Date(),
  //         });

  //         if (changeUser) {
  //           outPutData.key = `translate.UPDATE_USER_INFORMATION_SUCCESS`;
  //           outPutData.statusCode = StatusCode.UPDATE_USER_INFORMATION_SUCCESS;
  //           outPutData.data = { ...changeStatusDto };
  //         }
  //       }

  //       return this.formatOutputData(
  //         {
  //           key: outPutData.key,
  //           lang: outPutData.lang,
  //         },
  //         {
  //           statusCode: outPutData.statusCode,
  //           data: outPutData.data,
  //         },
  //       );
  //     } catch (e) {
  //       throw new BadRequestException(
  //         await this.formatOutputData(
  //           {
  //             key: outPutData.key,
  //             lang: outPutData.lang,
  //           },
  //           {
  //             statusCode: outPutData.statusCode,
  //             data: outPutData.data,
  //           },
  //         ),
  //       );
  //     }
  //   }

  @Transactional()
  async createUser(user: ICreateUser): Promise<UserEntity> {
    const userData = await this.userRepository.create(user);
    const userEntity = await this.userRepository.save(userData);

    let role = await this.rolesService.getRoleByName(user.role);
    if (!role) {
      role = await this.rolesService.create({
        name: user.role,
        description: `Role ${user.role}`,
        active: true,
        permissions: [
          PermissionActions.CREATE_TOOL,
          PermissionActions.UPDATE_TOOL,
          PermissionActions.DELETE_TOOL,
        ],
      });
    }

    await this.rolesService.createUserRole({
      userId: userEntity.id,
      roleId: role.id,
    });
    return userEntity;
  }

  async findUserByConditions(
    conditions: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.findOne(conditions);
  }

  //   async getListUsersActive(
  //     lang: string,
  //     searchSortDto: SearchSortDto,
  //   ): Promise<any> {
  //     const userData = await this.userRepository.getUsersActive(searchSortDto);

  //     return this.formatOutputData(
  //       {
  //         key: userData
  //           ? `translate.GET_LIST_USERS_SUCCESSFULLY`
  //           : `translate.GET_LIST_USERS_FAIL`,
  //         lang: lang || LanguageCode.United_States,
  //       },
  //       {
  //         statusCode: StatusCode.GET_LIST_USERS_SUCCESSFULLY,
  //         data: userData,
  //       },
  //     );
  //   }

  async generateSasUrl(
    putObjectDto: PutObjectDto,
    id: string,
  ): Promise<object> {
    const { fileName, permissions } = putObjectDto;
    const validatePermission = validateSasPermission(permissions);
    if (!validatePermission) {
      const response = await this.formatOutputData(
        {
          key: 'translate.GET_SAS_URL_INCORRECT_PERMISSION',
          lang: LanguageCode.United_States,
        },
        {
          statusCode: StatusCode.GET_SAS_URL_INCORRECT_PERMISSION,
          data: null,
        },
      );
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    const sasUrl = await getSasUrl(fileName, permissions, id);
    return this.formatOutputData(
      {
        key: 'translate.GET_SAS_URL_SUCCESSFULLY',
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.GET_SAS_URL_SUCCESSFULLY,
        data: { sasUrl },
      },
    );
  }

  findByIds(ids: string[]) {
    if (!ids.length) return;
    return this.userRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}

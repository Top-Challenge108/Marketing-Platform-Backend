import mongoose from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { IdsDto } from './dto/ids.dto';
import { IDRoleDto } from './dto/id-role-dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { RolesRepository } from './roles.repository';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { UserRoleRepository } from './user-role.repository';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LanguageCode, StatusCode } from '../../common/common.constants';
import { IUserRole } from './user-role.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesService extends BaseAbstractService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly userRoleRepository: UserRoleRepository,
    i18nService: I18nService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    super(i18nService);
  }

  async checkUserExist(userId: string, roleId: string) {
    return this.userRoleRepository.findOne({
      userId,
      roleId,
    });
  }

  async create(createRolesDto: CreateRolesDto) {
    const existingRole = await this.rolesRepository.findOne({
      name: { $regex: new RegExp(`^${createRolesDto.name}$`, 'i') },
    });

    if (existingRole) {
      const result = await this.formatOutputData(
        {
          key: `translate.ROLE_NAME_ALREADY_EXIT`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.ROLE_NAME_ALREADY_EXIT,
        },
      );

      throw new HttpException(result, HttpStatus.CONFLICT);
    }
    return this.rolesRepository.create(createRolesDto);
  }

  async getAllPermissions(idsDto: IdsDto) {
    const ids = idsDto.ids;
    const roles = await this.rolesRepository
      .findAll({ _id: { $in: ids }, active: true })
      .lean();
    const allPermissionsUnique = [
      ...new Set(roles.map((role) => role.permissions).flat()),
    ];
    return allPermissionsUnique;
  }

  async findOne(idRoleDto: IDRoleDto) {
    const { id } = idRoleDto;
    const checkRole = await this.rolesRepository
      .aggregate([
        {
          $lookup: {
            from: 'user-roles',
            localField: '_id',
            foreignField: 'roleId',
            as: 'userRoles',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userRoles.userId',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            active: 1,
            permissions: 1,
            users: {
              $map: {
                input: '$users',
                as: 'u',
                in: {
                  fullName: { $concat: ['$$u.firstName', ' ', '$$u.lastName'] },
                  email: '$$u.email',
                  phone: '$$u.phone',
                  _id: '$$u._id',
                  status: '$$u.status',
                },
              },
            },
          },
        },
      ])
      .match({
        _id: new mongoose.Types.ObjectId(id),
      });

    if (!checkRole.length || checkRole[0].name === 'Super Admin') {
      const response = await this.formatOutputData(
        {
          key: `translate.ROLE_NOT_FOUND`,
          lang: LanguageCode.United_States,
        },
        {
          statusCode: StatusCode.ROLE_NOT_FOUND,
          data: null,
        },
      );
      throw new HttpException(response, HttpStatus.NOT_FOUND);
    } else {
      return checkRole[0];
    }
  }

  async getRoles(getRolesDto: GetRolesDto): Promise<any> {
    const queryParam = ['_id', 'name'];
    const options = {
      select: 'name description active permissions',
    };
    const conditions = {};
    switch (getRolesDto?.active) {
      case 'true': {
        conditions['active'] = true;
        break;
      }
      case 'false': {
        conditions['active'] = false;
        break;
      }
    }

    if (!getRolesDto.sortBy) {
      getRolesDto.sortBy = 'name_asc';
    }
    options['sort'] = { ...options['sort'], createdAt: 'asc' };
    const roles = await this.rolesRepository.queryList(
      getRolesDto,
      options,
      conditions,
      queryParam,
    );

    return this.formatOutputData(
      {
        key: roles
          ? `translate.GET_LIST_ROLES_SUCCESSFULLY`
          : `translate.GET_LIST_ROLES_FAIL`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: roles
          ? StatusCode.GET_LIST_ROLES_SUCCESSFULLY
          : StatusCode.GET_LIST_ROLES_FAIL,
        data: roles,
      },
    );
  }

  async update(id: string, updateRolesDto: UpdateRolesDto) {
    let existingRole;
    if (updateRolesDto.name) {
      existingRole = await this.rolesRepository.aggregate([
        {
          $project: {
            name: { $toLower: '$name' },
          },
        },
        {
          $match: {
            _id: { $ne: new mongoose.Types.ObjectId(id) },
            name: updateRolesDto.name.toLowerCase(),
          },
        },
      ]);
    } else {
      existingRole = await this.rolesRepository.aggregate([
        {
          $match: {
            _id: { $ne: new mongoose.Types.ObjectId(id) },
          },
        },
      ]);
    }
    if (existingRole && existingRole.length > 0) {
      const result = await this.formatOutputData(
        {
          key: `translate.ROLE_NAME_ALREADY_EXIT`,
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.ROLE_NAME_ALREADY_EXIT,
        },
      );

      throw new HttpException(result, HttpStatus.CONFLICT);
    }

    const [roles] = await Promise.all([
      this.rolesRepository
        .findOneAndUpdate({ _id: id }, updateRolesDto, {
          returnNewDocument: true,
        })
        .lean(),
      this.userRoleRepository.findAll({ roleId: id }),
    ]);

    if (!roles) {
      throw new NotFoundException();
    } else {
      return { ...roles, ...updateRolesDto };
    }
  }

  async remove(id: string) {
    const roles = await this.rolesRepository.findOneAndDelete({ _id: id });
    if (!roles) throw new NotFoundException();
  }
  async paginate(getRolesDto: GetRolesDto) {
    const { limit, page } = getRolesDto;
    return this.formatOutputData(
      {
        key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
        lang: LanguageCode.Vn,
      },
      {
        statusCode: StatusCode.GET_LIST_USERS_SUCCESSFULLY,
        data: await this.rolesRepository.paginate(
          {
            /* query */
          },
          { limit, page },
        ),
      },
    );
  }

  mapGetUserId(users: IUserRole[]) {
    return users.map((user) => user.userId.toString());
  }

  mapCreateUserRole(userIds: string[], roleId: string) {
    return userIds.map((userId) => ({ userId, roleId }));
  }

  async createUserRole(addUserRoleDto: AddUserRoleDto) {
    const { userIds, roleId } = addUserRoleDto;
    const checkUsers = await this.userService.findByIds(userIds);
    if (checkUsers.length !== userIds.length) {
      return this.formatOutputData(
        {
          key: `translate.ADD_USER_ROLE_USER_NOT_EXIT`,
          lang: LanguageCode.United_States,
        },
        {
          data: {},
          statusCode: StatusCode.ADD_USER_ROLE_USER_NOT_EXIT,
        },
      );
    }
    const checkRole = await this.rolesRepository.findById(roleId);
    if (!checkRole) {
      return this.formatOutputData(
        {
          key: `translate.ROLE_NOT_FOUND`,
          lang: LanguageCode.United_States,
        },
        {
          data: {},
          statusCode: StatusCode.ROLE_NOT_FOUND,
        },
      );
    }
    const [userRole] = await Promise.all([
      this.mapCreateUserRole(userIds, roleId),
      this.userRoleRepository.deleteMany({
        roleId: roleId,
        userId: {
          $in: userIds,
        },
      }),
    ]);
    const result = await this.userRoleRepository.create(userRole);

    return this.formatOutputData(
      {
        key: `translate.ADD_USER_ROLE`,
        lang: LanguageCode.United_States,
      },
      {
        data: result,
        statusCode: StatusCode.ADD_USER_ROLE,
      },
    );
  }
  async removeUserRoles(addUserRoleDto: AddUserRoleDto) {
    const { userIds, roleId } = addUserRoleDto;
    return this.userRoleRepository.deleteMany({
      userId: { $in: userIds },
      roleId,
    });
  }

  async getRoleByName(name: string) {
    return this.rolesRepository.findOne({ name });
  }
}

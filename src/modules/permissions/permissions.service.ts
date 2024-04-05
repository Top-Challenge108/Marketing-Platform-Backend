import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { GetPermissionsDto } from './dto/get-permissions.dto';
import { LanguageCode, StatusCode } from '../../common/common.constants';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService extends BaseAbstractService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
    i18nService: I18nService,
  ) {
    super(i18nService);
  }

  //   async create(createPermissionsDto: CreatePermissionsDto) {
  //     const existingPermission = await this.permissionsRepository.findOne({
  //       action: createPermissionsDto.action,
  //     });
  //     if (existingPermission) {
  //       return null;
  //     }
  //     return this.permissionsRepository.create(createPermissionsDto);
  //   }

  //   async getPermissions(getRolesDto: GetPermissionsDto) {
  //     const queryParam = ['action', 'description'];
  //     const options = {
  //       select: 'action description',
  //     };
  //     const conditions = {};

  //     if (!getRolesDto.sortBy) {
  //       getRolesDto.sortBy = 'createdAt_asc';
  //     }
  //     options['sort'] = { ...options['sort'], createdAt: 'asc' };
  //     const permissions = await this.permissionsRepository.queryList(
  //       getRolesDto,
  //       options,
  //       conditions,
  //       queryParam,
  //     );

  //     return this.formatOutputData(
  //       {
  //         key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
  //         lang: LanguageCode.United_States,
  //       },
  //       {
  //         statusCode: StatusCode.GET_LIST_USERS_SUCCESSFULLY,
  //         data: permissions,
  //       },
  //     );
  //   }

  //   async findOne(id: string) {
  //     const checkPermissions = await this.permissionsRepository.findOne({
  //       _id: id,
  //     });
  //     if (!checkPermissions) {
  //       throw new NotFoundException();
  //     } else {
  //       return checkPermissions;
  //     }
  //   }

  //   async update(id: string, updatePermissionsDto: UpdatePermissionsDto) {
  //     const permissions = await this.permissionsRepository.findOneAndUpdate(
  //       { _id: id },
  //       updatePermissionsDto,
  //       { returnNewDocument: true },
  //     );
  //     if (!permissions) {
  //       throw new NotFoundException();
  //     } else {
  //       return permissions;
  //     }
  //   }

  //   async remove(id: string) {
  //     const permissions = await this.permissionsRepository.findOneAndDelete({
  //       _id: id,
  //     });
  //     if (!permissions) throw new NotFoundException();
  //   }

  //   async paginate(getPermissionsDto: GetPermissionsDto) {
  //     const { limit, page } = getPermissionsDto;
  //     return this.formatOutputData(
  //       {
  //         key: `translate.GET_LIST_USERS_SUCCESSFULLY`,
  //         lang: LanguageCode.Vn,
  //       },
  //       {
  //         statusCode: StatusCode.GET_LIST_USERS_SUCCESSFULLY,
  //         data: await this.permissionsRepository.paginate(
  //           {
  //             /* query */
  //           },
  //           { limit, page },
  //         ),
  //       },
  //     );
  //   }
}

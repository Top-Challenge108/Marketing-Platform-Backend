/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { Model } from 'mongoose';
import { IUserRoleDoc } from './user-role.interface';
import { UserRoleRepositoryInterface } from './interface/user-role.repository.interface';
import { USER_ROLE_MODEL } from './schema/user-role.schema';

@Injectable()
export class UserRoleRepository
  extends BaseAbstractRepository<IUserRoleDoc>
  implements UserRoleRepositoryInterface
{
  constructor(
    @InjectModel(USER_ROLE_MODEL)
    private readonly rolesPermissionsModel: Model<IUserRoleDoc>,
  ) {
    super(rolesPermissionsModel);
  }
}

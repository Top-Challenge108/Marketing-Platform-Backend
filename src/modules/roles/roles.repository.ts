/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { Model } from 'mongoose';
import { IRolesDoc } from './roles.interface';
import { ROLES_MODEL } from './schema/roles.schema';
import { RolesRepositoryInterface } from './interface/roles.repository.interface';
import { GetRolesDto } from './dto/get-roles.dto';

@Injectable()
export class RolesRepository
  extends BaseAbstractRepository<IRolesDoc>
  implements RolesRepositoryInterface
{
  constructor(
    @InjectModel(ROLES_MODEL)
    private readonly rolesModel: Model<IRolesDoc>,
  ) {
    super(rolesModel);
  }

  async getRoles(getRolesDto: GetRolesDto): Promise<any> {
    const queryParam = ['_id', 'name'];
    const options = {
      select: 'name description active',
    };

    const conditions = { name: { $ne: 'Super Admin' } };

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
    return this.queryList(getRolesDto, options, conditions, queryParam);
  }
}

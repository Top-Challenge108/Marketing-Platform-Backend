/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { Model } from 'mongoose';
import { IPermissionsDoc } from './permissions.interface';
import { PERMISSIONS_MODEL } from './schema/permissions.schema';
import { PermissionsRepositoryInterface } from './interface/permissions.repository.interface';

@Injectable()
export class PermissionsRepository
  extends BaseAbstractRepository<IPermissionsDoc>
  implements PermissionsRepositoryInterface
{
  constructor(
    @InjectModel(PERMISSIONS_MODEL)
    private readonly permissionsModel: Model<IPermissionsDoc>,
  ) {
    super(permissionsModel);
  }
}

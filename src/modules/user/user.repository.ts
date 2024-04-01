/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './interface/user.schema.interface';
import { USER_MODEL } from './schemas/user.schema';
import { UserRepositoryInterface } from './interface/user.repository.interface';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { GetUserDto } from './dto/get-users.dto';
import { TypeStatus } from '../../common/common.constants';
import { UserActiveDto } from './dto/user-active.dto';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<UserDocument>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
  async findUserActive(userActiveDto: UserActiveDto) {
    const queryParam = ['_id', 'fullName'];
    const options = {
      select: 'firstName lastName status',
      lean: true,
    };
    const condition = {
      status: TypeStatus.ACTIVE,
      isVerified: true,
    };
    return this.queryList(userActiveDto, options, condition, queryParam);
  }

  async getUsersActive(getUserDto: GetUserDto): Promise<any> {
    // Defines the query param that is allowed to be used in the query
    const queryParam = ['_id', 'fullName'];
    const options = { select: 'firstName lastName status joinDate' };
    if (!getUserDto.sortBy) {
      getUserDto.sortBy = 'joinDate_desc';
    }
    const condition = {
      status: TypeStatus.ACTIVE,
      isVerified: true,
    };
    return this.queryList(getUserDto, options, condition, queryParam);
  }
}

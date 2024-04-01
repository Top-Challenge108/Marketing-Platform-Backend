import * as mongoose from 'mongoose';
import { mongooseAggregatePaginate, paginate } from '../../../common/helpers';

const USER_ROLE_MODEL = 'user-roles';

const UserRoleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      ref: 'roles',
    },
  },
  {
    timestamps: true,
  },
);

UserRoleSchema.plugin(paginate);
UserRoleSchema.plugin(mongooseAggregatePaginate);

export { UserRoleSchema, USER_ROLE_MODEL };

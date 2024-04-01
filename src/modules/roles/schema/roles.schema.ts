import * as mongoose from 'mongoose';
import { mongooseAggregatePaginate, paginate } from '../../../common/helpers';
import { Role } from '../../../common/common.constants';

const ROLES_MODEL = 'roles';
const RolesSchema = new mongoose.Schema(
  {
    name: {
      require: true,
      unique: true,
      type: String,
      enum: Role,
    },

    description: {
      require: false,
      type: String,
    },

    active: {
      require: true,
      type: Boolean,
      default: true,
    },

    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
RolesSchema.plugin(paginate);
RolesSchema.plugin(mongooseAggregatePaginate);

export { ROLES_MODEL, RolesSchema };

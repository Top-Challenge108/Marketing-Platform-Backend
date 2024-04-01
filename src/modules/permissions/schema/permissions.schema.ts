import * as mongoose from 'mongoose';
import { mongooseAggregatePaginate, paginate } from '../../../common/helpers';

const PERMISSIONS_MODEL = 'permissions';
const PermissionsSchema = new mongoose.Schema(
  {
    action: {
      require: true,
      type: String,
    },

    description: {
      require: false,
      type: String,
    },
  },
  { timestamps: true },
);
PermissionsSchema.plugin(paginate);
PermissionsSchema.plugin(mongooseAggregatePaginate);

export { PERMISSIONS_MODEL, PermissionsSchema };

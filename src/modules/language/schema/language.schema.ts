import * as mongoose from 'mongoose';
import { mongooseAggregatePaginate, paginate } from '../../../common/helpers';

const LANGUAGES_MODEL = 'languages';
const LanguagesSchema = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },

    code: {
      require: true,
      type: String,
    },
    icon: {
      require: true,
      type: String,
    },
  },
  { timestamps: true },
);
LanguagesSchema.plugin(paginate);
LanguagesSchema.plugin(mongooseAggregatePaginate);

export { LANGUAGES_MODEL, LanguagesSchema };

import * as mongoose from 'mongoose';
import { TypeStatus, LanguageCode } from '../../../common/common.constants';
import { mongooseAggregatePaginate, paginate } from '../../../common/helpers';

const USER_MODEL = 'users';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
      sparse: true,
    },
    avatar: String,
    password: String,
    firstName: {
      type: String,
      default: '',
      required: false,
    },
    lastName: {
      type: String,
      required: false,
      default: '',
    },
    phone: {
      type: String,
      required: false,
      sparse: true,
    },
    status: {
      type: String,
      enum: Object.values(TypeStatus),
      default: TypeStatus.ACTIVE,
    },
    joinDate: {
      type: Date,
      default: new Date(),
    },
    dob: {
      required: false,
      type: Date,
      default: null,
    },
    citizenship: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    salt: String,
    lastUpdatePassword: {
      type: Date,
      required: false,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    language: {
      type: String,
      enum: LanguageCode,
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    locationId: {
      type: mongoose.Types.ObjectId,
      ref: 'locations',
    },
    company: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.plugin(paginate);
UserSchema.plugin(mongooseAggregatePaginate);

export { UserSchema, USER_MODEL };

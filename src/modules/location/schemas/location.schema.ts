import * as mongoose from 'mongoose';
import { mongooseAggregatePaginate, paginate } from '../../../common/helpers';

const LOCATION_MODEL = 'locations';

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    placeId: {
      require: true,
      type: String,
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

LocationSchema.plugin(paginate);
LocationSchema.plugin(mongooseAggregatePaginate);
LocationSchema.index({ location: '2dsphere' });

LocationSchema.on('index', function (err) {
  if (err) {
    console.error('Location index error: %s', err);
  } else {
    console.info('Location indexing complete');
  }
});

export { LocationSchema, LOCATION_MODEL };

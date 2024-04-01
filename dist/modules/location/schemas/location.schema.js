"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCATION_MODEL = exports.LocationSchema = void 0;
const mongoose = require("mongoose");
const helpers_1 = require("../../../common/helpers");
const LOCATION_MODEL = 'locations';
exports.LOCATION_MODEL = LOCATION_MODEL;
const LocationSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.LocationSchema = LocationSchema;
LocationSchema.plugin(helpers_1.paginate);
LocationSchema.plugin(helpers_1.mongooseAggregatePaginate);
LocationSchema.index({ location: '2dsphere' });
LocationSchema.on('index', function (err) {
    if (err) {
        console.error('Location index error: %s', err);
    }
    else {
        console.info('Location indexing complete');
    }
});
//# sourceMappingURL=location.schema.js.map
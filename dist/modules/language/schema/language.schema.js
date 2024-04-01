"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesSchema = exports.LANGUAGES_MODEL = void 0;
const mongoose = require("mongoose");
const helpers_1 = require("../../../common/helpers");
const LANGUAGES_MODEL = 'languages';
exports.LANGUAGES_MODEL = LANGUAGES_MODEL;
const LanguagesSchema = new mongoose.Schema({
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
}, { timestamps: true });
exports.LanguagesSchema = LanguagesSchema;
LanguagesSchema.plugin(helpers_1.paginate);
LanguagesSchema.plugin(helpers_1.mongooseAggregatePaginate);
//# sourceMappingURL=language.schema.js.map
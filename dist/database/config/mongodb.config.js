"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
function mongoConfig() {
    return {
        uri: process.env.COMMON_API_MONGODB_URI,
    };
}
exports.mongoConfig = mongoConfig;
//# sourceMappingURL=mongodb.config.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const redis_1 = require("redis");
const base_abstract_service_1 = require("../../base/base.abstract.service");
let RedisService = class RedisService extends base_abstract_service_1.BaseAbstractService {
    constructor(redis, i18nService) {
        super(i18nService);
        this.redis = redis;
    }
    async hSet(key, field, value) {
        return this.redis.hSet(key, field, value);
    }
    async hGet(key, field) {
        return this.redis.hGet(key, field);
    }
    async hDel(key, field) {
        return this.redis.hDel(key, field);
    }
    async set(key, value, options) {
        return this.redis.set(key, value, options);
    }
    async get(key) {
        return this.redis.get(key);
    }
    async del(key) {
        return this.redis.del(key);
    }
    async ttl(key) {
        return this.redis.ttl(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof redis_1.RedisClientType !== "undefined" && redis_1.RedisClientType) === "function" ? _a : Object, typeof (_b = typeof nestjs_i18n_1.I18nService !== "undefined" && nestjs_i18n_1.I18nService) === "function" ? _b : Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map
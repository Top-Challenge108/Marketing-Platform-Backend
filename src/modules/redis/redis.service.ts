import { Inject, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { RedisClientType } from 'redis';
import { BaseAbstractService } from '../../base/base.abstract.service';

@Injectable()
export class RedisService extends BaseAbstractService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    i18nService: I18nService,
  ) {
    super(i18nService);
  }

  async hSet(key: string, field: string, value: string): Promise<any> {
    return this.redis.hSet(key, field, value);
  }

  async hGet(key: string, field: string): Promise<any> {
    return this.redis.hGet(key, field);
  }

  async hDel(key: string, field: string): Promise<any> {
    return this.redis.hDel(key, field);
  }
  async set(key: string, value: string, options?: any): Promise<any> {
    return this.redis.set(key, value, options);
  }
  async get(key: string): Promise<any> {
    return this.redis.get(key);
  }
  async del(key: string): Promise<any> {
    return this.redis.del(key);
  }
  async ttl(key: string): Promise<any> {
    return this.redis.ttl(key);
  }
}

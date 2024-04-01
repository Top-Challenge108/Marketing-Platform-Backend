import { I18nService } from 'nestjs-i18n';
import { RedisClientType } from 'redis';
import { BaseAbstractService } from '../../base/base.abstract.service';
export declare class RedisService extends BaseAbstractService {
    private readonly redis;
    constructor(redis: RedisClientType, i18nService: I18nService);
    hSet(key: string, field: string, value: string): Promise<any>;
    hGet(key: string, field: string): Promise<any>;
    hDel(key: string, field: string): Promise<any>;
    set(key: string, value: string, options?: any): Promise<any>;
    get(key: string): Promise<any>;
    del(key: string): Promise<any>;
    ttl(key: string): Promise<any>;
}

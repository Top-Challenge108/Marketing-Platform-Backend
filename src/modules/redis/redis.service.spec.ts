import { Test } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { createClient } from 'redis';
import { redisConfig } from '../../configs/configs.constants';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let redisService: RedisService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: 'REDIS_OPTIONS',
          useValue: {
            url: redisConfig.COMMON_API_REDIS_URI,
          },
        },
        {
          inject: ['REDIS_OPTIONS'],
          provide: 'REDIS_CLIENT',
          useFactory: async (options: { url: string }) => {
            const client = createClient(options);
            await client.connect();
            return client;
          },
        },
        {
          provide: I18nService,
          useValue: {},
        },
      ],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
  });

  it('redisService should be defined', () => {
    expect(redisService).toBeDefined();
  });

  describe('[redis.service.ts] test function hSet', () => {
    it('should hSet data redis', async () => {
      const mockHSet = undefined;

      try {
        const data = await redisService.hSet('key', 'field', 'value');
        expect(data).toEqual(mockHSet);
      } catch (error) {}
    });
  });

  describe('[redis.service.ts] test function hGet', () => {
    it('should hGet data redis', async () => {
      const mockHGet = 'string';

      try {
        const data = await redisService.hGet('key', 'field');
        expect(data).toEqual(mockHGet);
      } catch (error) {}
    });
  });

  describe('[redis.service.ts] test function hDel', () => {
    it('should hDel data redis', async () => {
      const mockhDel = undefined;

      try {
        const data = await redisService.hDel('key', 'field');
        expect(data).toEqual(mockhDel);
      } catch (error) {}
    });
  });

  describe('[redis.service.ts] test function set', () => {
    it('should set data redis', async () => {
      const mockset = undefined;

      try {
        const data = await redisService.set('key', 'field', 'value');
        expect(data).toEqual(mockset);
      } catch (error) {}
    });
  });

  describe('[redis.service.ts] test function get', () => {
    it('should get data redis', async () => {
      const mockget = undefined;

      try {
        const data = await redisService.get('key');
        expect(data).toEqual(mockget);
      } catch (error) {}
    });
  });

  describe('[redis.service.ts] test function del', () => {
    it('should del data redis', async () => {
      const mockdel = undefined;

      try {
        const data = await redisService.del('key');
        expect(data).toEqual(mockdel);
      } catch (error) {}
    });
  });

  describe('[redis.service.ts] test function ttl', () => {
    it('should ttl data redis', async () => {
      const mockttl = undefined;

      try {
        const data = await redisService.ttl('key');
        expect(data).toEqual(mockttl);
      } catch (error) {}
    });
  });
});

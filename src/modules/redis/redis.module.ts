/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';
import { redisConfig } from '../../configs/configs.constants';

@Module({
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
  ],
  exports: [RedisService],
})
export class RedisModule {}

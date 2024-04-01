import { RedisService } from '../../../modules/redis/redis.service';
import { IJwtRefreshToken } from '../payloads/jwt-payload.payload';
import { UserService } from '../../../modules/user/user.service';
declare const VerifyRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class VerifyRefreshTokenStrategy extends VerifyRefreshTokenStrategy_base {
    private readonly redisService;
    private readonly userService;
    constructor(redisService: RedisService, userService: UserService);
    validate(req: Request, payload: IJwtRefreshToken): Promise<IJwtRefreshToken>;
}
export {};

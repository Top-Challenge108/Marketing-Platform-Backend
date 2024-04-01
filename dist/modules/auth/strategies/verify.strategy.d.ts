import { IJwtPayload } from '../payloads/jwt-payload.payload';
import { UserService } from '../../user/user.service';
import { LanguageService } from '../../../modules/language/language.service';
import { RedisService } from '../../../modules/redis/redis.service';
declare const VerifyStrategy_base: new (...args: any[]) => any;
export declare class VerifyStrategy extends VerifyStrategy_base {
    private readonly usersService;
    private readonly languageService;
    private readonly redisService;
    constructor(usersService: UserService, languageService: LanguageService, redisService: RedisService);
    validate(req: Request, payload: IJwtPayload): Promise<IJwtPayload>;
}
export {};

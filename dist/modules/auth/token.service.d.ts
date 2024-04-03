import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { RedisService } from '../redis/redis.service';
import { UserService } from '../user/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IJwtRefreshToken } from './payloads/jwt-payload.payload';
import { LanguageService } from '../language/language.service';
export declare class TokenService extends BaseAbstractService {
    private readonly userService;
    private readonly jwtService;
    private readonly redisService;
    private readonly languageService;
    constructor(userService: UserService, jwtService: JwtService, redisService: RedisService, languageService: LanguageService, i18nService: I18nService);
    createTokenLogin(userId: string, deviceId: string): Promise<{
        user: import("src/modules/user/interface/user.schema.interface").IUser;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(payload: IJwtRefreshToken, refreshTokenDto: RefreshTokenDto): Promise<{
        user: import("src/modules/user/interface/user.schema.interface").IUser;
        accessToken: string;
        refreshToken: any;
    }>;
}

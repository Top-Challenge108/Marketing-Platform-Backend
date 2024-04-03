import { UserService } from '../user/user.service';
import { IJwtPayload, IJwtRefreshToken } from './payloads/jwt-payload.payload';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { LanguageCode } from '../../common/common.constants';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { LoginDto } from './dto/login-user.dto';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RedisService } from '../redis/redis.service';
import { LogoutDto } from './dto/logout-user.dto';
import { LocationService } from '../location/location.service';
export declare class AuthService extends BaseAbstractService {
    private readonly userService;
    private readonly tokenService;
    private readonly redisService;
    private readonly i18nService;
    private readonly locationService;
    constructor(userService: UserService, tokenService: TokenService, redisService: RedisService, i18nService: I18nService, locationService: LocationService);
    signUp(signUpDto: SignUpDto): Promise<ResponseLoginDto>;
    signIn(loginDto: LoginDto, lang: LanguageCode): Promise<ResponseLoginDto>;
    refreshToken(payload: IJwtRefreshToken, refreshTokenDto: RefreshTokenDto): Promise<{
        user: import("src/modules/user/interface/user.schema.interface").IUser;
        accessToken: string;
        refreshToken: any;
    }>;
    logOut(user: IJwtPayload, logoutDto: LogoutDto): Promise<any>;
    validateSignUp(email?: any, phone?: any): any;
    verifyToken(): Promise<any>;
}

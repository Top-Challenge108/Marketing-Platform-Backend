/* istanbul ignore file */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from '../../../modules/redis/redis.service';
import { JwtConfig } from '../../../configs/configs.constants';
import { IJwtRefreshToken } from '../payloads/jwt-payload.payload';
import {
  LanguageCode,
  StatusCode,
  TypeStatus,
} from '../../../common/common.constants';
import { UserService } from '../../../modules/user/user.service';

@Injectable()
export class VerifyRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'verifyRefreshToken',
) {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: IJwtRefreshToken,
  ): Promise<IJwtRefreshToken> {
    const { _id, deviceId } = payload;
    const refreshToken = await this.redisService.hGet(
      `refresh-token-${_id.toString()}`,
      deviceId,
    );
    if (!refreshToken) {
      const result = await this.redisService.formatOutputData(
        {
          key: 'translate.UNAUTHORIZED',
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.UNAUTHORIZED,
        },
      );
      throw new HttpException(result, HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userService.findOneById(_id.toString());
    if (!user || user.status === TypeStatus.DEACTIVATED) {
      const result = await this.redisService.formatOutputData(
        {
          key: 'translate.UNAUTHORIZED',
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.UNAUTHORIZED,
        },
      );
      throw new HttpException(result, HttpStatus.UNAUTHORIZED);
    }

    if (
      user?.lastUpdatePassword.getTime() !==
      new Date(payload?.lastUpdatePassword).getTime()
    ) {
      const result = await this.redisService.formatOutputData(
        {
          key: 'translate.USER_FORCE_LOGOUT_STATUS',
          lang: LanguageCode.United_States,
        },
        {
          data: null,
          statusCode: StatusCode.USER_FORCE_LOGOUT_STATUS,
        },
      );
      throw new HttpException(result, HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}

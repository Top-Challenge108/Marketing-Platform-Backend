import { UserTokenService } from './../user/services/user-token.service';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { LanguageCode, StatusCode } from '../../common/common.constants';
import { BaseAbstractService } from '../../base/base.abstract.service';
import { JwtConfig } from '../../configs/configs.constants';
import { UserService } from '../user/services/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IJwtPayload, IJwtRefreshToken } from './payloads/jwt-payload.payload';
import { LanguageService } from '../language/language.service';
import * as _ from 'lodash';
import { UserDto } from '../user/dto/user.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class TokenService extends BaseAbstractService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly languageService: LanguageService,
    private readonly userTokenService: UserTokenService,
    private readonly i18nService: I18nService,
  ) {
    super(i18nService);
  }

  async createTokenLogin(userInfo: UserDto, deviceId: string) {
    const user = await this.userService.getUserInformationById(userInfo.id);
    const permissions = _.union(
      ...user.userRoles.map((role) => role.role.permissions),
    );
    const currently = dayjs();

    const accessTokenPayload: IJwtPayload = {
      id: userInfo.id,
      email: userInfo.email,
      phone: userInfo.phone,
      permissions,
      lastUpdatePassword: user.lastUpdatePassword,
      deviceId,
    };

    const expiredDate = currently.add(
      Number(JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_EXPIRES_IN),
      'millisecond',
    );
    const token = await this.userTokenService.createToken({
      userId: userInfo.id,
      expiredDate: expiredDate.toDate(),
    });

    const refreshTokenPayload: IJwtRefreshToken = {
      id: userInfo.id,
      deviceId: deviceId,
      language: LanguageCode.United_States,
      lastUpdatePassword: user.lastUpdatePassword,
      tokenId: token.id,
    };
    const accessTokenOptions: JwtSignOptions = {
      expiresIn: JwtConfig.COMMON_API_JWT_EXPIRES_IN,
      secret: JwtConfig.COMMON_API_JWT_SECRET,
    };
    const refreshTokenOptions: JwtSignOptions = {
      expiresIn: JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_EXPIRES_IN,
      secret: JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_SECRET,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, accessTokenOptions),
      this.jwtService.signAsync(refreshTokenPayload, refreshTokenOptions),
    ]);
    user.language = LanguageCode.United_States;

    return {
      user: userInfo,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const { tokenId, userId } = await this.decodeRefreshToken(dto.refreshToken);
    const token = await this.userTokenService.findOne(tokenId as string);

    const user = await this.userService.findOne({
      id: userId,
    });

    if (!token || !user) {
      throw new HttpException(
        await this.formatOutputData(
          {
            lang: LanguageCode.United_States,
            key: 'translate.UNAUTHORIZED',
          },
          { data: null, statusCode: StatusCode.UNAUTHORIZED },
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (token.isRevoked) {
      throw new HttpException(
        await this.formatOutputData(
          {
            lang: LanguageCode.United_States,
            key: 'translate.UNAUTHORIZED',
          },
          { data: null, statusCode: StatusCode.UNAUTHORIZED },
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userInfo = await this.userService.getUserInformationById(
      token.userId,
    );
    const permissions = _.union(
      ...userInfo.userRoles.map((role) => role.role.permissions),
    );
    const accessTokenPayload: IJwtPayload = {
      id: userInfo.id,
      email: userInfo.email,
      phone: userInfo.phone,
      permissions,
      deviceId: null,
      lastUpdatePassword: userInfo.lastUpdatePassword,
    };

    const refreshTokenPayload: IJwtRefreshToken = {
      id: userInfo.id,
      deviceId: null,
      language: LanguageCode.United_States,
      lastUpdatePassword: user.lastUpdatePassword,
      tokenId: token.id,
    };

    const accessTokenOptions: JwtSignOptions = {
      expiresIn: JwtConfig.COMMON_API_JWT_EXPIRES_IN,
      secret: JwtConfig.COMMON_API_JWT_SECRET,
    };
    const refreshTokenOptions: JwtSignOptions = {
      expiresIn: JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_EXPIRES_IN,
      secret: JwtConfig.COMMON_API_JWT_REFRESH_TOKEN_SECRET,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, accessTokenOptions),
      this.jwtService.signAsync(refreshTokenPayload, refreshTokenOptions),
    ]);

    return {
      user: userInfo,
      accessToken,
      refreshToken,
    };
  }

  private async decodeRefreshToken(refreshToken: string) {
    try {
      const validatedResult = await this.jwtService.verifyAsync(refreshToken, {
        algorithms: ['RS256'],
      });

      return validatedResult;
    } catch {
      throw new HttpException(
        await this.formatOutputData(
          {
            lang: LanguageCode.United_States,
            key: 'translate.UNAUTHORIZED',
          },
          { data: null, statusCode: StatusCode.UNAUTHORIZED },
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

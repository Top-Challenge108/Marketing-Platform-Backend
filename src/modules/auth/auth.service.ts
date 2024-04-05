import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtPayload, IJwtRefreshToken } from './payloads/jwt-payload.payload';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import {
  LanguageCode,
  StatusCode,
  TypeStatus,
} from '../../common/common.constants';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { decodePassword, getPlaceDetails } from '../../common/helpers';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout-user.dto';
import { LocationService } from '../location/location.service';

@Injectable()
export class AuthService extends BaseAbstractService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly i18nService: I18nService,
    private readonly locationService: LocationService,
  ) {
    super(i18nService);
  }

  async signUp(signUpDto: SignUpDto): Promise<ResponseLoginDto> {
    const {
      email = null,
      password,
      phone,
      role,
      placeId,
      firstName,
      lastName,
      company,
    } = signUpDto;
    let response;
    let country;

    const userExisted = await this.userService.findUserByEmail(email);
    if (userExisted) {
      response = await this.formatOutputData(
        {
          key: `translate.USER_SIGN_UP_EMAIL_EXISTED`,
          lang: LanguageCode.United_States,
        },
        {
          statusCode: StatusCode.USER_SIGN_UP_EMAIL_EXISTED,
          data: null,
        },
      );
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    const { salt, hashPassword } = await this.userService.hashPassword(
      decodePassword(password),
    );
    const data = await getPlaceDetails(placeId);
    if (!data) {
      response = await this.formatOutputData(
        {
          key: `translate.PLACE_ID_IS_NOT_CORRECT`,
          lang: LanguageCode.United_States,
        },
        {
          statusCode: StatusCode.PLACE_ID_IS_NOT_CORRECT,
          data: null,
        },
      );
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    const locationData = await this.locationService.findAndCreateLocation(data);
    const newUser = await this.userService.createUser({
      email,
      phone,
      status: TypeStatus.ACTIVE,
      salt,
      password: hashPassword,
      language: LanguageCode.United_States,
      country,
      locationId: locationData.id,
      role,
      firstName,
      lastName,
      company,
    });
    const token = await this.tokenService.createTokenLogin(
      newUser.id,
      'portal',
    );
    return this.formatOutputData(
      {
        key: `translate.USER_SIGN_UP_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.USER_SIGN_UP_SUCCESSFULLY,
        data: token,
      },
    );
  }

  async signIn(
    loginDto: LoginDto,
    lang: LanguageCode,
  ): Promise<ResponseLoginDto> {
    const { password, email } = loginDto;
    const result = {
      key: null,
      args: {},
      lang: lang,
      statusCode: null,
      data: null,
    };
    const userData = await this.userService.findUserByEmail(email);
    if (!userData) {
      return this.formatOutputData(
        { key: 'translate.EMAIL_NOT_EXIST', lang: result.lang },
        { statusCode: StatusCode.INVALID_EMAIL, data: result.data },
      );
    }
    const checkPass = await bcrypt.compare(
      decodePassword(password),
      userData.password,
    );
    if (checkPass) {
      const token = await this.tokenService.createTokenLogin(
        userData.id,
        'portal',
      );
      result.key = 'translate.USER_LOGIN_SUCCESSFULLY';
      result.statusCode = StatusCode.USER_LOGIN_SUCCESSFULLY;
      result.data = token;
      return this.formatOutputData(
        { key: result.key, lang: result.lang },
        { statusCode: result.statusCode, data: result.data },
      );
    } else {
      return this.formatOutputData(
        { key: 'translate.YOUR_ACCOUNT_IS_NOT_CORRECT', lang: result.lang },
        {
          statusCode: StatusCode.YOUR_ACCOUNT_IS_NOT_CORRECT,
          data: result.data,
        },
      );
    }
  }

  async refreshToken(
    payload: IJwtRefreshToken,
    refreshTokenDto: RefreshTokenDto,
  ) {
    return this.tokenService.refreshToken(payload, refreshTokenDto);
  }

  async logOut(user: IJwtPayload, logoutDto: LogoutDto): Promise<any> {
    // const { deviceId } = logoutDto;
    const { id, language } = user;
    const lang = language;
    const userInfo = await this.userService.findOneById(id);

    if (!userInfo) {
      throw new HttpException(
        'Your account has been deactivated',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.formatOutputData(
      {
        key: `translate.YOU_HAVE_BEEN_SUCCESSFULLY_LOGGED_OUT`,
        lang,
      },
      {
        statusCode: StatusCode.YOU_HAVE_BEEN_SUCCESSFULLY_LOGGED_OUT,
        data: {},
      },
    );
  }

  validateSignUp(email = null, phone = null) {
    return (!email && !phone) || (email && phone);
  }

  async verifyToken(): Promise<any> {
    return this.formatOutputData(
      {
        key: `translate.VERIFY_TOKEN_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.VERIFY_TOKEN_SUCCESSFULLY,
        data: {},
      },
    );
  }
}

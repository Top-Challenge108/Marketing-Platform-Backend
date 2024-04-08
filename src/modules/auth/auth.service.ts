import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { IJwtPayload } from './payloads/jwt-payload.payload';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../base/base.abstract.service';
import {
  LanguageCode,
  Role,
  StatusCode,
  TypeStatus,
} from '../../common/common.constants';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { decodePassword } from '../../common/helpers';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocationService } from '../location/location.service';
import { GoogleSignInDto } from './dto/google-sign-in.dto';
import { GoogleOAuthService } from '../integration/services/google-oauth.service';
import { UserTokenService } from '../user/services/user-token.service';

@Injectable()
export class AuthService extends BaseAbstractService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly userTokenService: UserTokenService,
    private readonly i18nService: I18nService,
    private readonly locationService: LocationService,
    private readonly googleOAuthService: GoogleOAuthService,
  ) {
    super(i18nService);
  }

  async signUp(signUpDto: SignUpDto): Promise<ResponseLoginDto> {
    const {
      email = null,
      password,
      phone,
      firstName,
      lastName,
      company,
    } = signUpDto;
    let response;
    let country;

    const userExisted = await this.userService.findUserByConditions({
      where: [{ email: email }, { phone: phone }],
    });
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

    const newUser = await this.userService.createUser({
      email,
      phone,
      status: TypeStatus.ACTIVE,
      salt,
      password: hashPassword,
      language: LanguageCode.United_States,
      country,
      locationId: null, //locationData.id
      role: Role.User,
      firstName,
      lastName,
      company,
    });
    const token = await this.tokenService.createTokenLogin(newUser, 'portal');
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

  async googleAuthenticateUser(loginDto: GoogleSignInDto) {
    const userInfo = await this.googleOAuthService.getUserDataFromToken(
      loginDto.token,
    );
    // {
    //     id: "108895746013634241526",
    //     email: "quangthap9x@gmail.com",
    //     verified_email: true,
    //     name: "Thập Lương",
    //     given_name: "Thập",
    //     family_name: "Lương",
    //     picture: "https://lh3.googleusercontent.com/a/ACg8ocLlibyTLWoUpbgAzi5zJ7pq4Iv5wQXIWuCWR-o_CGuh1hZfKZQ=s96-c",
    //     locale: "vi",
    //   }

    let response;

    if (!userInfo || (!userInfo.email && !userInfo.id)) {
      response = await this.formatOutputData(
        {
          key: `translate.GOOGLE_TOKEN_INVALID`,
          lang: LanguageCode.United_States,
        },
        {
          statusCode: StatusCode.GOOGLE_TOKEN_INVALID,
          data: null,
        },
      );
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }

    const googleUserInfo = await this.userService.upsertUserWithGoogle({
      email: userInfo.email as string,
      firstName: userInfo.given_name as string,
      lastName: userInfo.family_name as string,
      socialId: userInfo.id as string,
      avatar: userInfo.picture as string,
      language: userInfo.locale as string,
    });

    const responseInfo = await this.tokenService.createTokenLogin(
      googleUserInfo,
      'portal',
    );

    return this.formatOutputData(
      {
        key: `translate.USER_SIGN_UP_SUCCESSFULLY`,
        lang: LanguageCode.United_States,
      },
      {
        statusCode: StatusCode.USER_SIGN_UP_SUCCESSFULLY,
        data: responseInfo,
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
      const userInfo = await this.userService.findUserDto(userData.id);
      const token = await this.tokenService.createTokenLogin(
        userInfo,
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

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.tokenService.refreshToken(refreshTokenDto);
  }

  async logOut(user: IJwtPayload): Promise<any> {
    try {
      const { id, language } = user;
      const lang = language;
      await this.userTokenService.revokeTokenOfUser(id);
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
    } catch (error) {
      const response = await this.formatOutputData(
        {
          key: `translate.GOOGLE_TOKEN_INVALID`,
          lang: LanguageCode.United_States,
        },
        {
          statusCode: StatusCode.UNAUTHORIZED,
          data: null,
        },
      );
      throw new HttpException(response, StatusCode.UNAUTHORIZED);
    }
  }

  validateSignUp(email = null, phone = null) {
    return (!email && !phone) || (email && phone);
  }
}

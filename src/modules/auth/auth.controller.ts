import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseLoginDto } from './dto/response-login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { HeaderDto } from '../../common/common.dto';
import { Request } from 'express';
import {
  IJwtPayload,
  IJwtRefreshToken,
} from '../auth/payloads/jwt-payload.payload';
import { ResponseDto } from '../../common/common.dto';
import { LoginDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout-user.dto';
import { LanguageCode } from '../../common/common.constants';
import { HttpStatusCode } from 'axios';

@Controller('auth')
@ApiTags('Auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('verify'))
  @HttpCode(HttpStatusCode.Ok)
  logOut(
    @Req() req: Request,
    @Body() logOutDto: LogoutDto,
  ): Promise<ResponseDto> {
    return this.authService.logOut(<IJwtPayload>req.user, logOutDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register new user by email.' })
  @HttpCode(HttpStatusCode.Ok)
  @Post('sign-up')
  memberSignUp(@Body() signUpDto: SignUpDto): Promise<ResponseLoginDto> {
    console.log('====================================');
    console.log('signUpDto', signUpDto);
    console.log('====================================');
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'User login by email.' })
  @ApiOkResponse({ type: ResponseLoginDto })
  @HttpCode(HttpStatusCode.Ok)
  login(
    @Body() loginDto: LoginDto,
    @Headers() headerDto: HeaderDto,
  ): Promise<ResponseLoginDto> {
    return this.authService.signIn(
      loginDto,
      headerDto.lang || LanguageCode.United_States,
    );
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('verifyRefreshToken'))
  @ApiBearerAuth()
  @HttpCode(HttpStatusCode.Ok)
  refreshToken(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(
      <IJwtRefreshToken>req.user,
      refreshTokenDto,
    );
  }

  @ApiBearerAuth()
  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('verify'))
  @ApiBearerAuth()
  verifyToken() {
    return this.authService.verifyToken();
  }
}

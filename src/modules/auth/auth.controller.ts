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
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseLoginDto } from './dto/response-login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Request } from 'express';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import { HeaderDto, ResponseDto } from '../../common/common.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { HttpStatusCode } from 'axios';
import { GoogleSignInDto } from './dto/google-sign-in.dto';
import { LanguageCode } from '../../common/common.constants';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('Auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register new user by email.' })
  @HttpCode(HttpStatusCode.Ok)
  @Post('sign-up')
  memberSignUp(@Body() signUpDto: SignUpDto): Promise<ResponseLoginDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/authenticate')
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

  @Post('google-authenticate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GoogleSignInDto,
    description: 'User info with google access token',
  })
  async googleLogin(
    @Body() loginDto: GoogleSignInDto,
  ): Promise<ResponseLoginDto> {
    return this.authService.googleAuthenticateUser(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatusCode.Ok)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatusCode.Ok)
  logOut(@Req() req: Request): Promise<ResponseDto> {
    return this.authService.logOut(<IJwtPayload>req.user);
  }
}

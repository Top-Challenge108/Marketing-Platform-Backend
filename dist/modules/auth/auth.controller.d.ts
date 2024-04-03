import { AuthService } from './auth.service';
import { ResponseLoginDto } from './dto/response-login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { HeaderDto } from '../../common/common.dto';
import { Request } from 'express';
import { ResponseDto } from '../../common/common.dto';
import { LoginDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    logOut(req: Request, logOutDto: LogoutDto): Promise<ResponseDto>;
    memberSignUp(signUpDto: SignUpDto): Promise<ResponseLoginDto>;
    login(loginDto: LoginDto, headerDto: HeaderDto): Promise<ResponseLoginDto>;
    refreshToken(req: Request, refreshTokenDto: RefreshTokenDto): Promise<{
        user: import("src/modules/user/interface/user.schema.interface").IUser;
        accessToken: string;
        refreshToken: any;
    }>;
    verifyToken(): Promise<any>;
}

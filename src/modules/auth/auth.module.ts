/* istanbul ignore file */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from '../../configs/configs.constants';
import { LanguageModule } from '../language/language.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenService } from './token.service';
import { LocationModule } from '../location/location.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    LanguageModule,
    JwtModule.register({
      secret: JwtConfig.COMMON_API_JWT_SECRET,
      signOptions: {
        expiresIn: JwtConfig.COMMON_API_JWT_EXPIRES_IN,
      },
    }),

    LocationModule,
    PermissionsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
  exports: [TokenService],
})
export class AuthModule {}

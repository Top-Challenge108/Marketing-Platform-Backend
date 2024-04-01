/* istanbul ignore file */
import * as path from 'path';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LanguageCode } from './common/common.constants';
import { RolesModule } from './modules/roles/roles.module';
import { mongoConfig } from './database/config/mongodb.config';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionsService } from './modules/permissions/permissions.service';
import { LanguageModule } from './modules/language/language.module';
import { RedisModule } from './modules/redis/redis.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: LanguageCode.United_States,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: () => mongoConfig(),
    }),
    CommandModule,
    DiscoveryModule,
    UserModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
    LanguageModule,
    RedisModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly discover: DiscoveryService,
    private readonly permissionsService: PermissionsService,
  ) {}
  public async onModuleInit() {
    const decoratedMethods =
      await this.discover.methodsAndControllerMethodsWithMetaAtKey<any>(
        'permission',
      );
    for (const item of decoratedMethods) {
      await this.permissionsService.create({
        action: item.meta.action,
        description: item.meta.description,
      });
    }
    // auto generate permission base on decorator
  }
}

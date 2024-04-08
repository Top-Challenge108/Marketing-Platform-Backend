/* istanbul ignore file */
import * as path from 'path';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LanguageCode } from './common/common.constants';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionsService } from './modules/permissions/permissions.service';
import { LanguageModule } from './modules/language/language.module';
import { LocationModule } from './modules/location/location.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultDatabaseConfig } from './configs/configs.constants';
import { SnakeNamingStrategy } from './snake-naming.strategy';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { IntegrationModule } from './modules/integration/integration.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    I18nModule.forRoot({
      fallbackLanguage: LanguageCode.United_States,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '..', '/i18n/'),
        watch: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: () => {
        const entities = [
          __dirname + '/modules/**/*.entity{.ts,.js}',
          __dirname + '/modules/**/*.view-entity{.ts,.js}',
        ];
        const migrations = [__dirname + '/database/migrations/*{.ts,.js}'];

        return {
          entities,
          migrations,
          keepConnectionAlive: true,
          type: 'postgres',
          name: 'default',
          host: defaultDatabaseConfig.HOST,
          port: +defaultDatabaseConfig.PORT,
          username: defaultDatabaseConfig.USERNAME,
          password: defaultDatabaseConfig.PASSWORD,
          database: defaultDatabaseConfig.DATABASE,
          migrationsRun: false,
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    IntegrationModule,
    CommandModule,
    DiscoveryModule,
    UserModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
    LanguageModule,
    LocationModule,
    PaymentModule,
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
    // const decoratedMethods =
    //   await this.discover.methodsAndControllerMethodsWithMetaAtKey<any>(
    //     'permission',
    //   );
    // for (const item of decoratedMethods) {
    //   await this.permissionsService.create({
    //     action: item.meta.action,
    //     description: item.meta.description,
    //   });
    // }
    // auto generate permission base on decorator
  }
}

/* istanbul ignore file */
import { Module, forwardRef } from '@nestjs/common';
import { LanguageModule } from '../language/language.module';
import { LanguageService } from '../language/language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { StripeSubscriptionEntity } from './entities/stripe-subscription.entity';
import { SubscriptionMapper } from './mapper/subscription.mapper';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { UserModule } from '../user/user.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity, StripeSubscriptionEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => PermissionsModule),
    LanguageModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, LanguageService, SubscriptionMapper],
  exports: [],
})
export class SubscriptionModule {}

import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { GoogleOAuthService } from './services/google-oauth.service';
import { StripeCustomerService } from './services/stripe-customer.service';
import { StripeSubscriptionService } from './services/stripe-subscription.service';

const providers = [
  GoogleOAuthService,
  StripeCustomerService,
  StripeSubscriptionService,
];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class IntegrationModule {}

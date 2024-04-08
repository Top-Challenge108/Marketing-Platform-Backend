import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { GoogleOAuthService } from './services/google-oauth.service';
import { StripeCustomerService } from './services/stripe-customer.service';

const providers = [GoogleOAuthService, StripeCustomerService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class IntegrationModule {}

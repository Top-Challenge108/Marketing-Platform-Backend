import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { GoogleOAuthService } from './services/google-oauth.service';
import { StripeCustomerService } from './services/stripe-customer.service';
import { StripeSubscriptionService } from './services/stripe-subscription.service';
import { CloudinaryService } from './services/cloudinary.service';
import { v2 } from 'cloudinary';
import { cloudinaryConfig } from '../../configs/configs.constants';

const providers = [
  GoogleOAuthService,
  StripeCustomerService,
  StripeSubscriptionService,
  CloudinaryService,
];

@Global()
@Module({
  providers: [
    ...providers,
    {
      provide: 'Cloudinary',
      useFactory: () => {
        return v2.config({
          cloud_name: cloudinaryConfig.NAME,
          api_key: cloudinaryConfig.API_KEY,
          api_secret: cloudinaryConfig.API_SECRET,
        });
      },
    },
  ],
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class IntegrationModule {}

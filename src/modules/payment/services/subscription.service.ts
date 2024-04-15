import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../../base/base.abstract.service';
import Stripe from 'stripe';
import { stripeConfig } from '../../../configs/configs.constants';
import { SubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class SubscriptionService extends BaseAbstractService {
  private stripe: Stripe;
  constructor(i18nService: I18nService) {
    super(i18nService);
    this.stripe = new Stripe(stripeConfig.STRIPE_PRIVATE_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createStripeSubscriptionPayment(dto: SubscriptionDto) {
    try {
      const price = await this.stripe.prices.create({
        currency: 'usd',
        unit_amount: dto.amount,
        recurring: {
          interval: dto.recursionPlan,
        },
        product_data: {
          name: dto.name,
        },
      });

      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        // Todo: Fix callback url by sending more params to check is payment success or not
        success_url: `${stripeConfig.FRONTEND_URL}/success`,
        cancel_url: `${stripeConfig.FRONTEND_URL}/cancel`,
      });
      return session;
    } catch (e) {
      return e;
    }
  }
}

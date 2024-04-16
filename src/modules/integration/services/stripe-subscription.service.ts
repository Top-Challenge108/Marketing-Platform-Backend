import { Currency } from './../../tool/enum/tool.enum';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { stripeConfig } from '../../../configs/configs.constants';

@Injectable()
export class StripeSubscriptionService {
  private readonly stripeCore: Stripe;

  constructor() {
    this.stripeCore = new Stripe(stripeConfig.STRIPE_PRIVATE_KEY, {
      typescript: true,
      apiVersion: `2023-10-16`,
    });
  }

  async createStripeSubscriptionPayment(params: {
    amount: number;
    productName: string;
    productId: string;
    recursionPlan: 'day' | 'month' | 'week' | 'year';
    currency: Currency;
    callbackSuccessUrl: string;
    callbackFailureUrl: string;
  }) {
    try {
      const price = await this.stripeCore.prices.create({
        currency: params.currency,
        unit_amount: Number(params.amount),
        recurring: {
          interval: params.recursionPlan,
        },
        product_data: {
          name: params.productName,
          id: params.productId,
        },
      });

      const session = await this.stripeCore.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        success_url: params.callbackSuccessUrl, //`${stripeConfig.FRONTEND_URL}/success`,
        cancel_url: params.callbackFailureUrl, //`${stripeConfig.FRONTEND_URL}/cancel`,
      });

      return { session, price };
    } catch (e) {
      return {};
    }
  }
}

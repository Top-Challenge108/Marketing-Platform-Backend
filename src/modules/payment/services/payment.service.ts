import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { BaseAbstractService } from '../../../base/base.abstract.service';
import Stripe from 'stripe';
import { stripeConfig } from '../../../configs/configs.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolEntity } from '../../tool/entities/tool.entity';
import { StripeSubscriptionEntity } from '../../subscription/entities/stripe-subscription.entity';
import { Currency } from '../../subscription/enum/subscription.enum';

@Injectable()
export class PaymentService extends BaseAbstractService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolRepository: Repository<ToolEntity>,
    @InjectRepository(StripeSubscriptionEntity)
    private readonly stripeSubscriptionRepository: Repository<StripeSubscriptionEntity>,
    i18nService: I18nService,
  ) {
    super(i18nService);
    this.stripe = new Stripe(stripeConfig.STRIPE_PRIVATE_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async handleStripeCallBackHook(
    body: string | Buffer,
    signature: string | Buffer | string[],
  ) {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      stripeConfig.STRIPE_WEBHOOK_KEY,
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const sessionInfo = await this.stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ['line_items'],
          },
        );

        const subscriptionInfo = await this.stripe.subscriptions.retrieve(
          sessionInfo.subscription as string,
        );

        if (!sessionInfo.line_items.data.length) {
          console.log(`Event not contain info ${event.type}`);
          return;
        }

        const price = sessionInfo.line_items.data[0].price;
        const toolId = sessionInfo.line_items.data[0].price?.product;
        if (!price || !toolId) {
          console.log(`Missing product ID ${event.type}`);
          return;
        }

        const tool = await this.toolRepository.findOneBy({
          id: toolId as string,
        });
        if (!tool) {
          console.log(`Product not found ${event.type}`);
          return;
        }

        const stripeSubsEntity = this.stripeSubscriptionRepository.create({
          name: tool.name,
          price: sessionInfo.amount_total,
          currency: price.currency.toUpperCase() as Currency,
          stripeSubscriptionId: subscriptionInfo?.id,
          currentPeriodEnd: subscriptionInfo?.current_period_end,
          currentPeriodStart: subscriptionInfo?.current_period_start,
          status: subscriptionInfo?.status,
          startDate: subscriptionInfo?.start_date,
        });

        await this.stripeSubscriptionRepository.save(stripeSubsEntity);
        // // sessionInfo.line_items.data[0].price.recurring.interval

        console.log('sessionInfo' + JSON.stringify(sessionInfo.line_items));
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}

import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './services/subscription.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { StripeSubscriptionEntity } from '../subscription/entities/stripe-subscription.entity';
import { SubscriptionEntity } from '../subscription/entities/subscription.entity';
import { ToolDealEntity } from '../tool/entities/tool-deal.entity';
import { ToolEntity } from '../tool/entities/tool.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ToolEntity,
      ToolDealEntity,
      SubscriptionEntity,
      StripeSubscriptionEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [SubscriptionController, PaymentController],
  providers: [SubscriptionService, PaymentService],
  exports: [SubscriptionService, PaymentService],
})
export class PaymentModule {}

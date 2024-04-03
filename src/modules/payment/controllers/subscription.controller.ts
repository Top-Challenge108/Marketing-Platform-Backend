import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionDto } from '../dto/subscription.dto';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async getStripeListPlan(@Body() dto: SubscriptionDto) {
    return this.subscriptionService.createStripeSubscriptionPayment(dto);
  }
}

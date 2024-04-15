// create payment controller

import {
  Controller,
  Post,
  Headers,
  RawBodyRequest,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from '../services/payment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('webhook')
  onStripeEvent(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!req.body) {
      throw new BadRequestException();
    }

    return this.paymentService.handleStripeCallBackHook(req.rawBody, sig);
  }
}

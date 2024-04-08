import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { stripeConfig } from '../../../configs/configs.constants';

@Injectable()
export class StripeCustomerService {
  private readonly stripeCore: Stripe;

  constructor() {
    this.stripeCore = new Stripe(stripeConfig.STRIPE_PRIVATE_KEY, {
      typescript: true,
      apiVersion: `2023-10-16`,
    });
  }

  createCustomer(params: {
    email?: string;
    name?: string;
    description?: string;
    city?: string;
    countryCode?: string;
    postalCode?: string;
    phone?: string;
  }) {
    const { description, email, name, phone, city, countryCode, postalCode } =
      params;

    return this.stripeCore.customers.create({
      description,
      email,
      name,
      phone,
      address: {
        city,
        country: countryCode,
        postal_code: postalCode,
      },
    });
  }

  updateCustomer(
    id: string,
    params: {
      description?: string;
      email?: string;
      city?: string;
      countryCode?: string;
      postalCode?: string;
      name?: string;
      phone?: string;
    },
  ) {
    const { description, email, name, phone, city, countryCode, postalCode } =
      params;

    return this.stripeCore.customers.update(id, {
      description,
      email,
      name,
      phone,
      address: {
        city,
        country: countryCode,
        postal_code: postalCode,
      },
    });
  }
}

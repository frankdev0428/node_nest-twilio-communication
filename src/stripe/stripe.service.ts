import { HttpException, Injectable } from '@nestjs/common';
import User from 'src/entity/user.entity';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2022-11-15',
});

@Injectable()
export class StripeService {
  async createSubscriptionSession(): Promise<any> {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_1,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.HOST_URL}/subscription_success`,
      cancel_url: `${process.env.HOST_URL}/subscription_canceled`,
    });
    return {
      url: session.url,
    };
  }

  async listSubscriptions(): Promise<any> {
    const subscriptions = await stripe.subscriptions.list({
      limit: 3,
      status : 'all',
    });
    console.log(subscriptions);
    return subscriptions;
  }

  async listCustomers(email: string): Promise<any> {
    const customers = await stripe.customers.list({
      limit: 3,
      email : email,
    });
    return customers;
  }

  async sendInvoice(userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }

    const customers = await stripe.customers.list({
      limit: 1,
      email : user.email,
    });

    console.log(customers);

    return 'sent';
  }

  async enableInvoiceHistory(userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }

    const configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'communicate, LLC',
      },
      features: {
        invoice_history: {
          enabled: true
        }
      },
    });
    console.log(configuration);
    return 'enabled';
  }

  async createCustomerPortalSession(userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }

    const customers = await stripe.customers.list({
      limit: 1,
      email : user.email,
    });

    let customer = customers.data[0];

    if (!customer) {
      throw new HttpException(`Not existing customer with ${user.email}`, 500);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: `${customer.id}`,
      return_url: 'https://business.communicate.io/',
    });
  
    return session.url;
  }
}

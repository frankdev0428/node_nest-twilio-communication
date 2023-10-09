"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const stripe_1 = require("stripe");
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: '2022-11-15',
});
let StripeService = class StripeService {
    async createSubscriptionSession() {
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
    async listSubscriptions() {
        const subscriptions = await stripe.subscriptions.list({
            limit: 3,
            status: 'all',
        });
        console.log(subscriptions);
        return subscriptions;
    }
    async listCustomers(email) {
        const customers = await stripe.customers.list({
            limit: 3,
            email: email,
        });
        return customers;
    }
    async sendInvoice(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        const customers = await stripe.customers.list({
            limit: 1,
            email: user.email,
        });
        console.log(customers);
        return 'sent';
    }
    async enableInvoiceHistory(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
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
    async createCustomerPortalSession(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        const customers = await stripe.customers.list({
            limit: 1,
            email: user.email,
        });
        let customer = customers.data[0];
        if (!customer) {
            throw new common_1.HttpException(`Not existing customer with ${user.email}`, 500);
        }
        const session = await stripe.billingPortal.sessions.create({
            customer: `${customer.id}`,
            return_url: 'https://business.communicate.io/',
        });
        return session.url;
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)()
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map
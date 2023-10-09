import { StripeService } from "./stripe.service";
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    generateToken(): Promise<any>;
    listSubscription(): Promise<any>;
    listCustomers(email: string): Promise<any>;
    sendInvoice(req: any): Promise<any>;
    enableInvoiceHistory(req: any): Promise<any>;
    createCustomerPortalSession(req: any): Promise<any>;
}

export declare class StripeService {
    createSubscriptionSession(): Promise<any>;
    listSubscriptions(): Promise<any>;
    listCustomers(email: string): Promise<any>;
    sendInvoice(userData: any): Promise<any>;
    enableInvoiceHistory(userData: any): Promise<any>;
    createCustomerPortalSession(userData: any): Promise<any>;
}

import SMSHistory from "src/entity/sms-history.entity";
import { MessagingWebhookBody } from "src/types/request";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
export declare const SMSRepository: import("typeorm").Repository<SMSHistory> & {
    getSMSHistoryList(customerId: number): Promise<SMSHistory[]>;
    createSMSHistory(res: MessageInstance, userData: any): Promise<any>;
    saveReceivedSMS(body: MessagingWebhookBody): Promise<any>;
};

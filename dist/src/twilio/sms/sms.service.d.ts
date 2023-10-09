import { SendSMSDto } from './dto/send-sms.dto';
import SMSHistory from 'src/entity/sms-history.entity';
import { MessagingWebhookBody } from 'src/types/request';
export declare class SMSService {
    sendSMS(content: SendSMSDto, userData: any): Promise<any>;
    getSMS(customerId: number): Promise<SMSHistory[]>;
    saveReceivedSMS(body: MessagingWebhookBody): Promise<any>;
}

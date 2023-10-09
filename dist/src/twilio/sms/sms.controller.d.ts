import { Request } from "express";
import SMSHistory from "src/entity/sms-history.entity";
import { MessagingRequest } from "src/types/request";
import { NotificationGateway } from "../notifications/notification.gateway";
import { SendSMSDto } from "./dto/send-sms.dto";
import { SMSService } from "./sms.service";
export declare class SMSController {
    private readonly smsService;
    private readonly notificationGateway;
    constructor(smsService: SMSService, notificationGateway: NotificationGateway);
    getSMS(customerId: number): Promise<SMSHistory[]>;
    sendSMS(content: SendSMSDto, req: Request): Promise<any>;
    receiveSMS(req: MessagingRequest): Promise<any>;
}

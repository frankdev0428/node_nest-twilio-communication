import { BaseEntity } from "typeorm";
import Customer from "./customer.entity";
export default class FacebookHistory extends BaseEntity {
    id: number;
    type: number;
    body: string;
    numSegments: string;
    from: string;
    to: string;
    accountSid: string;
    numMedia: string;
    apiVersion: string;
    smsMessageSid: string;
    smsSid: string;
    smsStatus: string;
    referralNumMedia: string;
    messageSid: string;
    createdDate: Date;
    updatedDate: Date;
    customerId: number;
    customer: Customer;
}

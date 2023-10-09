import { BaseEntity } from "typeorm";
import Customer from "./customer.entity";
export default class WebChatHistory extends BaseEntity {
    id: number;
    type: number;
    body: string;
    bRead: boolean;
    attachments: string;
    createdDate: Date;
    updatedDate: Date;
    customerId: number;
    customer: Customer;
}

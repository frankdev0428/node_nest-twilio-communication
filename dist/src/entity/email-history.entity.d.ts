import { BaseEntity } from "typeorm";
import Customer from "./customer.entity";
export default class EmailHistory extends BaseEntity {
    id: number;
    type: number;
    fromEmail: string;
    toEmail: string;
    subject: string;
    content: string;
    text: string;
    messageId: string;
    createdDate: Date;
    updatedDate: Date;
    customerId: number;
    customer: Customer;
}

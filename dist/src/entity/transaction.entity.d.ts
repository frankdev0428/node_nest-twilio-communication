import { BaseEntity } from "typeorm";
import Customer from "./customer.entity";
export default class Transaction extends BaseEntity {
    id: number;
    sid: string;
    oid: string;
    pid: string;
    type: string;
    reference: string;
    description: string;
    date: string;
    amount: string;
    url: string;
    createdDate: Date;
    updatedDate: Date;
    customer: Customer;
}

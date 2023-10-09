import { BaseEntity } from "typeorm";
import SMSHistory from "./sms-history.entity";
export default class MessageMedia extends BaseEntity {
    id: number;
    type: number;
    contentType: string;
    url: string;
    createdDate: Date;
    updatedDate: Date;
    message: SMSHistory;
}

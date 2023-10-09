import { BaseEntity } from "typeorm";
import User from "./user.entity";
export default class ChatHistory extends BaseEntity {
    id: number;
    body: string;
    bRead: boolean;
    createdDate: Date;
    updatedDate: Date;
    fromUser: User;
    toUser: User;
}

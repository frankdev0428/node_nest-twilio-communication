import { BaseEntity } from "typeorm";
import User from "./user.entity";
export default class PortOrder extends BaseEntity {
    id: number;
    number: string;
    createdDate: Date;
    updatedDate: Date;
    user: User;
}

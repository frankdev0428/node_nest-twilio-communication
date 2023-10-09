import { BaseEntity } from "typeorm";
import Category from "./category.entity";
export default class Question extends BaseEntity {
    id: number;
    question: string;
    answer: string;
    createdDate: Date;
    updatedDate: Date;
    category: Category;
}

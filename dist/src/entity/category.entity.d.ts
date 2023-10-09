import { BaseEntity } from "typeorm";
import Question from "./question.entity";
export default class Category extends BaseEntity {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    questions: Question[];
}

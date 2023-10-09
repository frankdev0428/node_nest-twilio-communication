import Category from "src/entity/category.entity";
import Question from "src/entity/question.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { UpdateQuestionDto } from "../dto/update-question.dto";
export declare const HelpRepository: import("typeorm").Repository<Category> & {
    createCategory(createCategoryDto: CreateCategoryDto): Promise<any>;
    getCategories(): Promise<Category[]>;
    getCategoryById(id: any): Promise<Category>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>;
    deleteCategory(id: number): Promise<any>;
    getQuestions(categoryId: number): Promise<Question[]>;
    getQuestionById(id: number): Promise<any>;
    deleteQuestion(id: number): Promise<any>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
};

import { HelpService } from './help.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class HelpController {
    private readonly helpService;
    constructor(helpService: HelpService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<any>;
    getCategories(): Promise<import("../entity/category.entity").default[]>;
    getCategoryById(id: number): Promise<import("../entity/category.entity").default>;
    deleteCategory(id: number): Promise<any>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("../entity/category.entity").default>;
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("../entity/question.entity").default>;
    getQuestions(categoryId: number): Promise<import("../entity/question.entity").default[]>;
    getQuestionById(id: number): Promise<any>;
    deleteQuestion(id: number): Promise<any>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<import("../entity/question.entity").default>;
}

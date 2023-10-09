"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpRepository = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../data-source");
const category_entity_1 = require("../../entity/category.entity");
const question_entity_1 = require("../../entity/question.entity");
exports.HelpRepository = data_source_1.AppDataSource.getRepository(category_entity_1.default).extend({
    async createCategory(createCategoryDto) {
        const category = new category_entity_1.default();
        category.name = createCategoryDto.name;
        await category.save();
        return category;
    },
    async getCategories() {
        const categories = await category_entity_1.default.find({
            relations: ['questions'],
            order: {
                name: 'ASC',
            },
        });
        return categories;
    },
    async getCategoryById(id) {
        const category = await category_entity_1.default.findOne({
            where: {
                id,
            },
            relations: ['questions'],
        });
        if (!category) {
            throw new common_1.HttpException(`Not found a category with id=${id}`, 500);
        }
        return category;
    },
    async updateCategory(id, updateCategoryDto) {
        const category = await category_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!category) {
            throw new common_1.HttpException(`Not found a category with id=${id}`, 500);
        }
        category.name = updateCategoryDto.name;
        await category.save();
        return category;
    },
    async createQuestion(createQuestionDto) {
        const category = await category_entity_1.default.findOne({
            where: {
                id: createQuestionDto.categoryId,
            },
        });
        if (!category) {
            throw new common_1.HttpException(`Not found a category with id=${createQuestionDto.categoryId}`, 500);
        }
        const question = new question_entity_1.default();
        question.question = createQuestionDto.question;
        question.answer = createQuestionDto.answer;
        question.category = category;
        await question.save();
        return question;
    },
    async deleteCategory(id) {
        await question_entity_1.default.delete({
            category: {
                id,
            },
        });
        await category_entity_1.default.delete(id);
        return 'deleted';
    },
    async getQuestions(categoryId) {
        const questions = await question_entity_1.default.find({
            where: {
                category: {
                    id: categoryId,
                },
            },
        });
        return questions;
    },
    async getQuestionById(id) {
        const question = await question_entity_1.default.findOne({
            where: {
                id,
            }
        });
        if (!question) {
            throw new common_1.HttpException(`Not found a question with ${id}`, 500);
        }
        return question;
    },
    async deleteQuestion(id) {
        await question_entity_1.default.delete(id);
        return { id };
    },
    async updateQuestion(id, updateQuestionDto) {
        const question = await question_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!question) {
            throw new common_1.HttpException(`Not found a question with ${id}`, 500);
        }
        question.question = updateQuestionDto.question;
        question.answer = updateQuestionDto.answer;
        await question.save();
        return question;
    }
});
//# sourceMappingURL=help.repository.js.map
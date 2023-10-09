import { HttpException } from "@nestjs/common";
import { AppDataSource } from "src/data-source";
import Category from "src/entity/category.entity";
import Question from "src/entity/question.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { UpdateQuestionDto } from "../dto/update-question.dto";

export const HelpRepository = AppDataSource.getRepository(Category).extend({
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    const category = new Category();
    category.name = createCategoryDto.name;

    await category.save();
    return category;
  },

  async getCategories(): Promise<Category[]> {
    const categories = await Category.find({
      relations: ['questions'],
      order: {
        name: 'ASC',
      },
    });
    return categories;
  },

  async getCategoryById(id): Promise<Category> {
    const category = await Category.findOne({
      where: {
        id,
      },
      relations: ['questions'],
    });

    if (!category) {
      throw new HttpException(`Not found a category with id=${id}`, 500);
    }
    
    return category;
  },

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await Category.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException(`Not found a category with id=${id}`, 500);
    }

    category.name = updateCategoryDto.name;
    await category.save();

    return category;
  },

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const category = await Category.findOne({
      where: {
        id: createQuestionDto.categoryId,
      },
    });

    if (!category) {
      throw new HttpException(`Not found a category with id=${createQuestionDto.categoryId}`, 500);
    }

    const question = new Question();
    question.question = createQuestionDto.question;
    question.answer = createQuestionDto.answer;
    question.category = category;
    await question.save();
    
    return question;
  },

  async deleteCategory(id: number): Promise<any> {
    await Question.delete({
      category: {
        id,
      },
    });
    await Category.delete(id);
    return 'deleted';
  },

  async getQuestions(categoryId: number): Promise<Question[]> {
    const questions = await Question.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return questions;
  },

  async getQuestionById(id: number): Promise<any> {
    const question = await Question.findOne({
      where: {
        id,
      }
    });
    if (!question) {
      throw new HttpException(`Not found a question with ${id}`, 500);
    }
    return question;
  },

  async deleteQuestion(id: number): Promise<any> {
    await Question.delete(id);
    return { id };
  },
  
  async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await Question.findOne({
      where: {
        id,
      },
    });

    if (!question) {
      throw new HttpException(`Not found a question with ${id}`, 500);
    }

    question.question = updateQuestionDto.question;
    question.answer = updateQuestionDto.answer;
    // question.category = category;
    await question.save();
    
    return question;
  }
})
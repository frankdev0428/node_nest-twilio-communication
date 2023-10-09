import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { HelpRepository } from './repository/help.repository';

@Injectable()
export class HelpService {
  createCategory(createCategoryDto: CreateCategoryDto) {
    return HelpRepository.createCategory(createCategoryDto);
  }

  getCategories() {
    return HelpRepository.getCategories();
  }

  getCategoryById(id: number) {
    return HelpRepository.getCategoryById(id);
  }

  updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    return HelpRepository.updateCategory(id, updateCategoryDto);
  }

  deleteCategory(id: number) {
    return HelpRepository.deleteCategory(id);
  }

  createQuestion(createQuestionDto: CreateQuestionDto) {
    return HelpRepository.createQuestion(createQuestionDto);
  }

  getQuestions(categoryId: number) {
    return HelpRepository.getQuestions(categoryId);
  }

  getQuestionById(id: number) {
    return HelpRepository.getQuestionById(id);
  }

  deleteQuestion(id: number) {
    return HelpRepository.deleteQuestion(id);
  }

  updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    return HelpRepository.updateQuestion(id, updateQuestionDto);
  }
  // findAll(user: any) {
  //   return CustomerRepository.findCustomers(user);
  // }

  // findOne(id: number) {
  //   return CustomerRepository.findCustomer(id);
  // }

  // update(id: number, updateCustomerDto: UpdateCustomerDto, user: any) {
  //   return CustomerRepository.updateCustomer(id, updateCustomerDto, user);
  // }

  // remove(id: number) {
  //   return CustomerRepository.removeCustomer(id);
  // }

  // removeByIds(ids: number[]) {
  //   return CustomerRepository.removeByIds(ids);
  // }

  // updateStatus(id: number, status: string, user: any) {
  //   return CustomerRepository.updateStatus(id, status, user);
  // }

  // updateDepartment(id: number, department: string, user: any) {
  //   return CustomerRepository.updateDepartment(id, department, user);
  // }

  // updatePriority(id: number, priority: string, user: any) {
  //   return CustomerRepository.updatePriority(id, priority, user);
  // }

  // updateAgent(id: number, agent: string, user: any) {
  //   return CustomerRepository.updateAgent(id, agent, user);
  // }
}

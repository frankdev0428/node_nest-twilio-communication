import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './repository/customer.repository';

@Injectable()
export class CustomerService {
  create(createCustomerDto: CreateCustomerDto, user: any) {
    return CustomerRepository.createCustomer(createCustomerDto, user);
  }

  createMultiple(createCustomerDtos: CreateCustomerDto[], user: any) {
    return CustomerRepository.createCustomers(createCustomerDtos, user);
  }

  findAll(user: any) {
    return CustomerRepository.findCustomers(user);
  }

  findOne(id: number) {
    return CustomerRepository.findCustomer(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto, user: any) {
    return CustomerRepository.updateCustomer(id, updateCustomerDto, user);
  }

  remove(id: number) {
    return CustomerRepository.removeCustomer(id);
  }

  removeByIds(ids: number[]) {
    return CustomerRepository.removeByIds(ids);
  }

  updateEmail(id: number, email: string, user: any) {
    return CustomerRepository.updateEmail(id, email, user);
  }

  updateNumber(id: number, number: string, user: any) {
    return CustomerRepository.updateNumber(id, number, user);
  }

  updateName(id: number, name: string, user: any) {
    return CustomerRepository.updateName(id, name, user);
  }

  updateCityState(id: number, name: string, user: any) {
    return CustomerRepository.updateCityState(id, name, user);
  }

  updateStreet(id: number, name: string, user: any) {
    return CustomerRepository.updateStreet(id, name, user);
  }

  updateStatus(id: number, status: string, user: any) {
    return CustomerRepository.updateStatus(id, status, user);
  }

  updateAvatar(id: number, avatar: string, user: any) {
    return CustomerRepository.updateAvatar(id, avatar, user);
  }

  updateDepartment(id: number, department: string, user: any) {
    return CustomerRepository.updateDepartment(id, department, user);
  }

  updatePriority(id: number, priority: string, user: any) {
    return CustomerRepository.updatePriority(id, priority, user);
  }

  updateAgent(id: number, agent: string, user: any) {
    return CustomerRepository.updateAgent(id, agent, user);
  }

  updateFacebookMessengerId(id: number, messengerId: string, user: any) {
    return CustomerRepository.updateFacebookMessengerId(id, messengerId, user);
  }

  async mergeCustomerForFacebook(customerId1: number, customerId2: number) {
    const resp = await CustomerRepository.mergeCustomerForFacebook(customerId1, customerId2);
    await CustomerRepository.removeCustomer(customerId1);
    return resp;
  }

  importFromHD(userData: any) {
    return CustomerRepository.importFromHD(userData);
  }

  importTransactionsFromHD(userData: any) {
    return CustomerRepository.importTransactionsFromHD(userData);
  }

  getTransactions(id: number) {
    return CustomerRepository.getTransactions(id);
  }

  importOrdersFromHD(customerId: number, userData: any) {
    return CustomerRepository.importOrdersFromHD(customerId, userData);
  }

  getWebhooks(customerId: number, userData: any) {
    return CustomerRepository.getWebhooks(customerId, userData);
  }
}

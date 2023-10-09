"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_1 = require("./repository/customer.repository");
let CustomerService = class CustomerService {
    create(createCustomerDto, user) {
        return customer_repository_1.CustomerRepository.createCustomer(createCustomerDto, user);
    }
    createMultiple(createCustomerDtos, user) {
        return customer_repository_1.CustomerRepository.createCustomers(createCustomerDtos, user);
    }
    findAll(user) {
        return customer_repository_1.CustomerRepository.findCustomers(user);
    }
    findOne(id) {
        return customer_repository_1.CustomerRepository.findCustomer(id);
    }
    update(id, updateCustomerDto, user) {
        return customer_repository_1.CustomerRepository.updateCustomer(id, updateCustomerDto, user);
    }
    remove(id) {
        return customer_repository_1.CustomerRepository.removeCustomer(id);
    }
    removeByIds(ids) {
        return customer_repository_1.CustomerRepository.removeByIds(ids);
    }
    updateEmail(id, email, user) {
        return customer_repository_1.CustomerRepository.updateEmail(id, email, user);
    }
    updateNumber(id, number, user) {
        return customer_repository_1.CustomerRepository.updateNumber(id, number, user);
    }
    updateName(id, name, user) {
        return customer_repository_1.CustomerRepository.updateName(id, name, user);
    }
    updateCityState(id, name, user) {
        return customer_repository_1.CustomerRepository.updateCityState(id, name, user);
    }
    updateStreet(id, name, user) {
        return customer_repository_1.CustomerRepository.updateStreet(id, name, user);
    }
    updateStatus(id, status, user) {
        return customer_repository_1.CustomerRepository.updateStatus(id, status, user);
    }
    updateAvatar(id, avatar, user) {
        return customer_repository_1.CustomerRepository.updateAvatar(id, avatar, user);
    }
    updateDepartment(id, department, user) {
        return customer_repository_1.CustomerRepository.updateDepartment(id, department, user);
    }
    updatePriority(id, priority, user) {
        return customer_repository_1.CustomerRepository.updatePriority(id, priority, user);
    }
    updateAgent(id, agent, user) {
        return customer_repository_1.CustomerRepository.updateAgent(id, agent, user);
    }
    updateFacebookMessengerId(id, messengerId, user) {
        return customer_repository_1.CustomerRepository.updateFacebookMessengerId(id, messengerId, user);
    }
    async mergeCustomerForFacebook(customerId1, customerId2) {
        const resp = await customer_repository_1.CustomerRepository.mergeCustomerForFacebook(customerId1, customerId2);
        await customer_repository_1.CustomerRepository.removeCustomer(customerId1);
        return resp;
    }
    importFromHD(userData) {
        return customer_repository_1.CustomerRepository.importFromHD(userData);
    }
    importTransactionsFromHD(userData) {
        return customer_repository_1.CustomerRepository.importTransactionsFromHD(userData);
    }
    getTransactions(id) {
        return customer_repository_1.CustomerRepository.getTransactions(id);
    }
    importOrdersFromHD(customerId, userData) {
        return customer_repository_1.CustomerRepository.importOrdersFromHD(customerId, userData);
    }
    getWebhooks(customerId, userData) {
        return customer_repository_1.CustomerRepository.getWebhooks(customerId, userData);
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)()
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map
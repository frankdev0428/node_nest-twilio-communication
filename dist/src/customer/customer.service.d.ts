import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerService {
    create(createCustomerDto: CreateCustomerDto, user: any): Promise<any>;
    createMultiple(createCustomerDtos: CreateCustomerDto[], user: any): Promise<any>;
    findAll(user: any): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCustomerDto: UpdateCustomerDto, user: any): Promise<any>;
    remove(id: number): Promise<any>;
    removeByIds(ids: number[]): Promise<any>;
    updateEmail(id: number, email: string, user: any): Promise<any>;
    updateNumber(id: number, number: string, user: any): Promise<any>;
    updateName(id: number, name: string, user: any): Promise<any>;
    updateCityState(id: number, name: string, user: any): Promise<any>;
    updateStreet(id: number, name: string, user: any): Promise<any>;
    updateStatus(id: number, status: string, user: any): Promise<any>;
    updateAvatar(id: number, avatar: string, user: any): Promise<any>;
    updateDepartment(id: number, department: string, user: any): Promise<any>;
    updatePriority(id: number, priority: string, user: any): Promise<any>;
    updateAgent(id: number, agent: string, user: any): Promise<any>;
    updateFacebookMessengerId(id: number, messengerId: string, user: any): Promise<any>;
    mergeCustomerForFacebook(customerId1: number, customerId2: number): Promise<any>;
    importFromHD(userData: any): Promise<string>;
    importTransactionsFromHD(userData: any): Promise<string>;
    getTransactions(id: number): Promise<import("../entity/transaction.entity").default[]>;
    importOrdersFromHD(customerId: number, userData: any): Promise<{
        order: any;
    }>;
    getWebhooks(customerId: number, userData: any): Promise<{
        webhooks: any;
        events: any;
    }>;
}

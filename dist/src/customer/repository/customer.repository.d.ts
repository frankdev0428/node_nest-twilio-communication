import Customer from 'src/entity/customer.entity';
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import Transaction from "src/entity/transaction.entity";
export declare const CustomerRepository: import("typeorm").Repository<Customer> & {
    createCustomer(createCustomerDto: CreateCustomerDto, userData: any): Promise<any>;
    createCustomers(createCustomerDtos: CreateCustomerDto[], userData: any): Promise<any>;
    fetchCustomers(userId: number, adminId: number, onlyAgent?: boolean): Promise<any[]>;
    findCustomers(userData: any): Promise<any[]>;
    findCustomer(id: number): Promise<any>;
    removeCustomer(id: number): Promise<any>;
    getMaxId(): Promise<number>;
    updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto, userData: any): Promise<any>;
    removeByIds(ids: number[]): Promise<any>;
    updateStatus(id: number, status: string, userData: any): Promise<any>;
    updateAvatar(id: number, avatar: string, userData: any): Promise<any>;
    updateDepartment(id: number, department: string, userData: any): Promise<any>;
    updatePriority(id: number, priority: string, userData: any): Promise<any>;
    updateAgent(id: number, agent: string, userData: any): Promise<any>;
    mergeCustomerForFacebook(customerId1: number, customerId2: number): Promise<any>;
    importFromHD(userData: any): Promise<string>;
    importTransactionsFromHD(userData: any): Promise<string>;
    updateEmail(id: number, email: string, userData: any): Promise<any>;
    updateNumber(id: number, number: string, userData: any): Promise<any>;
    updateName(id: number, name: string, userData: any): Promise<any>;
    updateCityState(id: number, name: string, userData: any): Promise<any>;
    updateStreet(id: number, name: string, userData: any): Promise<any>;
    updateFacebookMessengerId(id: number, messageSid: string, userData: any): Promise<any>;
    getTransactions(id: number): Promise<Transaction[]>;
    importOrdersFromHD(customerId: number, userData: any): Promise<{
        order: any;
    }>;
    getWebhooks(customerId: number, userData: any): Promise<{
        webhooks: any;
        events: any;
    }>;
    getResponseTime(userData: any): Promise<any>;
    getIncomingMessagesForRange(userData: any, startDate: string, endDate: string, duration: string, agentId: number): Promise<{
        email: {};
        sms: {};
        calls: {};
        messenger: {};
        livechat: {};
    }>;
};

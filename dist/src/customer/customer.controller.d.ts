import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createHistoryDto: CreateCustomerDto, req: any): Promise<any>;
    createMultiple(createHistoryDtos: CreateCustomerDto[], req: any): Promise<any>;
    findAll(req: any): Promise<any[]>;
    findOne(id: string): Promise<any>;
    updateAvatar(id: string, avatar: string, req: any): Promise<any>;
    updateStatus(id: string, status: string, req: any): Promise<any>;
    updateDepartment(id: string, department: string, req: any): Promise<any>;
    updatePriority(id: string, priority: string, req: any): Promise<any>;
    updateAgent(id: string, priority: string, req: any): Promise<any>;
    update(id: string, updateCustomerDto: UpdateCustomerDto, req: any): Promise<any>;
    updateEmail(id: string, email: string, req: any): Promise<any>;
    updateNumber(id: string, number: string, req: any): Promise<any>;
    updateName(id: string, name: string, req: any): Promise<any>;
    updateCityState(id: string, name: string, req: any): Promise<any>;
    updateStreet(id: string, name: string, req: any): Promise<any>;
    updateFacebookMessengerId(id: string, name: string, req: any): Promise<any>;
    remove(id: string): Promise<any>;
    removeByIds(ids: number[]): Promise<any>;
    mergeCustomerForFacebook(customerId1: number, customerId2: number): Promise<any>;
    importFromHD(req: any): Promise<string>;
    importTransactionsFromHD(req: any): Promise<string>;
    getTransactions(id: number): Promise<import("../entity/transaction.entity").default[]>;
    importOrdersFromHD(req: any, id: number): Promise<{
        order: any;
    }>;
    getWebhooks(req: any, id: number): Promise<{
        webhooks: any;
        events: any;
    }>;
}

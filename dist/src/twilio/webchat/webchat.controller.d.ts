import { WebchatService } from './webchat.service';
import { CreateWebchatDto } from './dto/create-webchat.dto';
import { SearchCustomerDto } from './dto/search-customer.dto';
export declare class WebchatController {
    private readonly webchatService;
    constructor(webchatService: WebchatService);
    getWebchat(userId: number, customerId: number): Promise<import("../../entity/web-chat-history.entity").default[]>;
    receiveWebchat(createWebchatDto: CreateWebchatDto): Promise<any>;
    sendWebchat(createWebchatDto: CreateWebchatDto): Promise<any>;
    getPossibleCustomer(searchCustomerDto: SearchCustomerDto, userId: number): Promise<import("../../entity/customer.entity").default>;
}

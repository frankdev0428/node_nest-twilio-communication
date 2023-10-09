import Customer from "src/entity/customer.entity";
import WebChatHistory from "src/entity/web-chat-history.entity";
import { CreateCustomerFromLiveChatDto } from "../dto/create-customer.dto";
import { CreateWebchatDto } from "../dto/create-webchat.dto";
import { SearchCustomerDto } from "../dto/search-customer.dto";
export declare const WebchatRepository: import("typeorm").Repository<WebChatHistory> & {
    getWebchat(userId: number, customerId: number): Promise<WebChatHistory[]>;
    receiveWebchat(createWebchatDto: CreateWebchatDto): Promise<any>;
    sendWebchat(createWebchatDto: CreateWebchatDto): Promise<any>;
    getPossibleCustomer(userId: number, searchCustomerDto: SearchCustomerDto): Promise<Customer>;
    createCustomerFromLiveChat(userId: number, createCustomerFromLiveChatDto: CreateCustomerFromLiveChatDto): Promise<Customer>;
};

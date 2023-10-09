import { NotificationGateway } from '../notifications/notification.gateway';
import { CreateWebchatDto } from './dto/create-webchat.dto';
import { WebchatNotificationGateway } from '../notifications/webchat-notification.gateway';
import { SearchCustomerDto } from './dto/search-customer.dto';
export declare class WebchatService {
    private readonly notificationGateway;
    private readonly webchatNotificationGateway;
    constructor(notificationGateway: NotificationGateway, webchatNotificationGateway: WebchatNotificationGateway);
    getWebchat(userId: number, customerId: number): Promise<import("../../entity/web-chat-history.entity").default[]>;
    receiveWebchat(createWebchatDto: CreateWebchatDto): Promise<any>;
    sendWebchat(createWebchatDto: CreateWebchatDto): Promise<any>;
    getPossibleCustomer(userId: number, searchCustomerDto: SearchCustomerDto): Promise<import("../../entity/customer.entity").default>;
}

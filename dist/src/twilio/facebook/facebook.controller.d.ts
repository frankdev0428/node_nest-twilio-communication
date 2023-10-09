import { Request } from "express";
import { NotificationGateway } from "../notifications/notification.gateway";
import { CreateFacebookDto } from "./dto/create-facebook.dto";
import { SendFacebookDto } from "./dto/send-facebook.dto";
import { FacebookService } from "./facebook.service";
export declare class FacebookController {
    private readonly facebookService;
    private readonly notificationGateway;
    constructor(facebookService: FacebookService, notificationGateway: NotificationGateway);
    getFacebookWebhook(req: Request): Promise<any>;
    receiveFacebookMessage(createFacebookDto: CreateFacebookDto): Promise<any>;
    setFacebookWebhook(createFacebookDto: CreateFacebookDto): Promise<any>;
    sendMessage(sendFacebookDto: SendFacebookDto, req: Request): Promise<any>;
    receiveMessage(content: any, req: Request): Promise<any>;
}

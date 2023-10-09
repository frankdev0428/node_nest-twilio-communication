import { Request } from 'express';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { SendFacebookDto } from './dto/send-facebook.dto';
export declare class FacebookService {
    getFacebookWebhook(req: Request): Promise<any>;
    receiveFacebookMessage(createFacebookDto: CreateFacebookDto): Promise<any>;
    setFacebookWebhook(createFacebookDto: CreateFacebookDto): Promise<any>;
    sendMessage(sendFacebookDto: SendFacebookDto, userData: any): Promise<any>;
    receiveMessage(content: any, body: any): Promise<any>;
}

import FacebookHistory from "src/entity/facebook-history.entity";
import { CreateFacebookDto } from "../dto/create-facebook.dto";
import { SendFacebookDto } from "../dto/send-facebook.dto";
export declare const FacebookRepository: import("typeorm").Repository<FacebookHistory> & {
    receiveFacebookMessage(body: CreateFacebookDto): Promise<any>;
    sendMessage(sendFacebookDto: SendFacebookDto, userData: any): Promise<any>;
};

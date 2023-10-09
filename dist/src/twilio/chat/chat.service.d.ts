import { CreateChatDto } from './dto/create-chat.dto';
export declare class ChatService {
    getUsersForHistory(userData: any): Promise<any[]>;
    getChatHistory(userId: number, userData: any): Promise<import("../../entity/chat-history.entity").default[]>;
    setAsRead(userId: number, userData: any): Promise<import("../../entity/chat-history.entity").default[]>;
    setChatHistoryAsRead(userId: number, chatHistoryId: number, userData: any): Promise<import("../../entity/chat-history.entity").default>;
    sendChat(createChatDto: CreateChatDto, userData: any): Promise<import("../../entity/chat-history.entity").default>;
}

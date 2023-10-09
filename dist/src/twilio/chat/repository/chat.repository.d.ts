import ChatHistory from "src/entity/chat-history.entity";
import { CreateChatDto } from "../dto/create-chat.dto";
export declare const ChatRepository: import("typeorm").Repository<ChatHistory> & {
    getUsersForHistory(userData: any): Promise<any[]>;
    getChatHistory(userId: number, userData: any): Promise<ChatHistory[]>;
    sendChat(createChatDto: CreateChatDto, userData: any): Promise<ChatHistory>;
    setAsRead(userId: number, userData: any): Promise<ChatHistory[]>;
    setChatHistoryAsRead(userId: number, chatHistoryId: number, userData: any): Promise<ChatHistory>;
};

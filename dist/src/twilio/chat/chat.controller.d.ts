import ChatHistory from "src/entity/chat-history.entity";
import { NotificationGateway } from "../notifications/notification.gateway";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
export declare class ChatController {
    private readonly chatService;
    private readonly notificationGateway;
    constructor(chatService: ChatService, notificationGateway: NotificationGateway);
    getUsersForHistory(req: any): Promise<any[]>;
    getChatHistory(userId: number, req: any): Promise<ChatHistory[]>;
    setAsRead(userId: number, req: any): Promise<ChatHistory[]>;
    setChatHistoryAsRead(userId: number, chatHistoryId: number, req: any): Promise<ChatHistory>;
    sendChat(createChatDto: CreateChatDto, req: any): Promise<ChatHistory>;
}

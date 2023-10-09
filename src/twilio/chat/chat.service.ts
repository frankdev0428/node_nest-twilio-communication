import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatRepository } from './repository/chat.repository';

@Injectable()
export class ChatService {
  getUsersForHistory(userData: any) {
    return ChatRepository.getUsersForHistory(userData);
  }

  getChatHistory(userId: number, userData: any) {
    return ChatRepository.getChatHistory(userId, userData);
  }

  setAsRead(userId: number, userData: any) {
    return ChatRepository.setAsRead(userId, userData);
  }

  setChatHistoryAsRead(userId: number, chatHistoryId: number, userData: any) {
    return ChatRepository.setChatHistoryAsRead(userId, chatHistoryId, userData);
  }

  async sendChat(createChatDto: CreateChatDto, userData: any) {
    return ChatRepository.sendChat(createChatDto, userData);
  }
}

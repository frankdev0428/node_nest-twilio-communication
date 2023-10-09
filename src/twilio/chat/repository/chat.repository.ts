import { HttpException } from "@nestjs/common";
import { AppDataSource } from "src/data-source";
import ChatHistory from "src/entity/chat-history.entity";
import User from "src/entity/user.entity";
import { Brackets, Not } from "typeorm";
import { CreateChatDto } from "../dto/create-chat.dto";

export const ChatRepository = AppDataSource.getRepository(ChatHistory).extend({
  async getUsersForHistory(userData: any) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin', 'sentMessages', 'sentMessages.fromUser', 'sentMessages.toUser',
        'receivedMessages', 'receivedMessages.fromUser', 'receivedMessages.toUser'],
    });

    if (!user) {
      throw new HttpException(`User not found with ${userData.id}`, 500);
    }

    let users = [];
    if (user.admin) {
      users = await User.find({
        where: {
          admin: {
            id: user.admin.id,
          },
          id: Not(user.id),
        },
      });
      users = [user.admin, ...users];
    } else {
      users = await User.find({
        where: {
          admin: {
            id: user.id,
          },
        },
        // relations: ['sentMessages', 'receivedMessages'],
      });
    }
    
    const messages = [...user.sentMessages, ...user.receivedMessages];
    messages.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());

    for (const userObj of users) {
      const filtered = messages.filter((msg) => msg.fromUser.id == userObj.id || msg.toUser.id == userObj.id)
      
      if (filtered.length) {
        userObj['latest'] = filtered[0];
        userObj['unreadCount'] = filtered.reduce((count, msg) => count + Number(!msg.bRead && msg.fromUser.id == userObj.id), 0);
      } else {
        userObj['latest'] = null;
        userObj['unreadCount'] = 0;
      }
    }

    return users;
  },

  async getChatHistory(userId: number, userData: any) {
    const user1 = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user1) {
      throw new HttpException(`User not found with ${userData.id}`, 500);
    }

    const user2 = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user2) {
      throw new HttpException(`User not found with ${user2.id}`, 500);
    }

    const chatHistories = await ChatHistory.createQueryBuilder('chat_history')
      .leftJoinAndSelect('chat_history.fromUser', 'fromUser')
      .leftJoinAndSelect('chat_history.toUser', 'toUser')
      .where(new Brackets((qb) => {
        qb.where('fromUser.id = :userId1', { userId1: user1.id })
          .andWhere('toUser.id = :userId2', { userId2: user2.id });
      }))
      .orWhere(new Brackets((qb) => {
        qb.where('fromUser.id = :userId3', { userId3: user2.id })
          .andWhere('toUser.id = :userId4', { userId4: user1.id });
      }))
      .orderBy('chat_history.createdDate', 'ASC')
      .getMany();
    return chatHistories;
  },

  async sendChat(createChatDto: CreateChatDto, userData: any) {
    const fromUser = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!fromUser) {
      throw new HttpException(`User not found with ${userData.id}`, 500);
    }

    const toUser = await User.findOne({
      where: {
        id: createChatDto.toUserId,
      },
    });

    if (!toUser) {
      throw new HttpException(`User not found with ${toUser.id}`, 500);
    }

    const chatHistory = new ChatHistory();
    chatHistory.body = createChatDto.body;
    chatHistory.fromUser = fromUser;
    chatHistory.toUser = toUser;
    chatHistory.bRead = false;
    await chatHistory.save();

    return chatHistory;
  },

  async setAsRead(userId: number, userData: any) {
    const user1 = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user1) {
      throw new HttpException(`User not found with ${userData.id}`, 500);
    }

    const user2 = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user2) {
      throw new HttpException(`User not found with ${user2.id}`, 500);
    }

    const chatHistories = await ChatHistory.createQueryBuilder('chat_history')
      .leftJoinAndSelect('chat_history.fromUser', 'fromUser')
      .leftJoinAndSelect('chat_history.toUser', 'toUser')
      .where(new Brackets((qb) => {
        qb.where('fromUser.id = :userId1', { userId1: user2.id })
          .andWhere('toUser.id = :userId2', { userId2: user1.id });
      }))
      .getMany();

    for (const chatHistory of chatHistories) {
      chatHistory.bRead = true;
      await chatHistory.save();
    }
    return chatHistories;
  },
  
  async setChatHistoryAsRead(userId: number, chatHistoryId: number, userData: any) {
    const user1 = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user1) {
      throw new HttpException(`User not found with ${userData.id}`, 500);
    }

    const user2 = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user2) {
      throw new HttpException(`User not found with ${user2.id}`, 500);
    }

    const chatHistory = await ChatHistory.findOne({
      where: {
        id: chatHistoryId,
      },
    });
    chatHistory.bRead = true;
    await chatHistory.save();

    return chatHistory;
  },
})
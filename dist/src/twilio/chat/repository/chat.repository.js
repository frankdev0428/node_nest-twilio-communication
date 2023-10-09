"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const chat_history_entity_1 = require("../../../entity/chat-history.entity");
const user_entity_1 = require("../../../entity/user.entity");
const typeorm_1 = require("typeorm");
exports.ChatRepository = data_source_1.AppDataSource.getRepository(chat_history_entity_1.default).extend({
    async getUsersForHistory(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin', 'sentMessages', 'sentMessages.fromUser', 'sentMessages.toUser',
                'receivedMessages', 'receivedMessages.fromUser', 'receivedMessages.toUser'],
        });
        if (!user) {
            throw new common_1.HttpException(`User not found with ${userData.id}`, 500);
        }
        let users = [];
        if (user.admin) {
            users = await user_entity_1.default.find({
                where: {
                    admin: {
                        id: user.admin.id,
                    },
                    id: (0, typeorm_1.Not)(user.id),
                },
            });
            users = [user.admin, ...users];
        }
        else {
            users = await user_entity_1.default.find({
                where: {
                    admin: {
                        id: user.id,
                    },
                },
            });
        }
        const messages = [...user.sentMessages, ...user.receivedMessages];
        messages.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
        for (const userObj of users) {
            const filtered = messages.filter((msg) => msg.fromUser.id == userObj.id || msg.toUser.id == userObj.id);
            if (filtered.length) {
                userObj['latest'] = filtered[0];
                userObj['unreadCount'] = filtered.reduce((count, msg) => count + Number(!msg.bRead && msg.fromUser.id == userObj.id), 0);
            }
            else {
                userObj['latest'] = null;
                userObj['unreadCount'] = 0;
            }
        }
        return users;
    },
    async getChatHistory(userId, userData) {
        const user1 = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user1) {
            throw new common_1.HttpException(`User not found with ${userData.id}`, 500);
        }
        const user2 = await user_entity_1.default.findOne({
            where: {
                id: userId,
            },
        });
        if (!user2) {
            throw new common_1.HttpException(`User not found with ${user2.id}`, 500);
        }
        const chatHistories = await chat_history_entity_1.default.createQueryBuilder('chat_history')
            .leftJoinAndSelect('chat_history.fromUser', 'fromUser')
            .leftJoinAndSelect('chat_history.toUser', 'toUser')
            .where(new typeorm_1.Brackets((qb) => {
            qb.where('fromUser.id = :userId1', { userId1: user1.id })
                .andWhere('toUser.id = :userId2', { userId2: user2.id });
        }))
            .orWhere(new typeorm_1.Brackets((qb) => {
            qb.where('fromUser.id = :userId3', { userId3: user2.id })
                .andWhere('toUser.id = :userId4', { userId4: user1.id });
        }))
            .orderBy('chat_history.createdDate', 'ASC')
            .getMany();
        return chatHistories;
    },
    async sendChat(createChatDto, userData) {
        const fromUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!fromUser) {
            throw new common_1.HttpException(`User not found with ${userData.id}`, 500);
        }
        const toUser = await user_entity_1.default.findOne({
            where: {
                id: createChatDto.toUserId,
            },
        });
        if (!toUser) {
            throw new common_1.HttpException(`User not found with ${toUser.id}`, 500);
        }
        const chatHistory = new chat_history_entity_1.default();
        chatHistory.body = createChatDto.body;
        chatHistory.fromUser = fromUser;
        chatHistory.toUser = toUser;
        chatHistory.bRead = false;
        await chatHistory.save();
        return chatHistory;
    },
    async setAsRead(userId, userData) {
        const user1 = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user1) {
            throw new common_1.HttpException(`User not found with ${userData.id}`, 500);
        }
        const user2 = await user_entity_1.default.findOne({
            where: {
                id: userId,
            },
        });
        if (!user2) {
            throw new common_1.HttpException(`User not found with ${user2.id}`, 500);
        }
        const chatHistories = await chat_history_entity_1.default.createQueryBuilder('chat_history')
            .leftJoinAndSelect('chat_history.fromUser', 'fromUser')
            .leftJoinAndSelect('chat_history.toUser', 'toUser')
            .where(new typeorm_1.Brackets((qb) => {
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
    async setChatHistoryAsRead(userId, chatHistoryId, userData) {
        const user1 = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user1) {
            throw new common_1.HttpException(`User not found with ${userData.id}`, 500);
        }
        const user2 = await user_entity_1.default.findOne({
            where: {
                id: userId,
            },
        });
        if (!user2) {
            throw new common_1.HttpException(`User not found with ${user2.id}`, 500);
        }
        const chatHistory = await chat_history_entity_1.default.findOne({
            where: {
                id: chatHistoryId,
            },
        });
        chatHistory.bRead = true;
        await chatHistory.save();
        return chatHistory;
    },
});
//# sourceMappingURL=chat.repository.js.map
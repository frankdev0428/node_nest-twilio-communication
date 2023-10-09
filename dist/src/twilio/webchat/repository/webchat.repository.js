"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebchatRepository = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const customer_entity_1 = require("../../../entity/customer.entity");
const user_entity_1 = require("../../../entity/user.entity");
const web_chat_history_entity_1 = require("../../../entity/web-chat-history.entity");
const typeorm_1 = require("typeorm");
exports.WebchatRepository = data_source_1.AppDataSource.getRepository(web_chat_history_entity_1.default).extend({
    async getWebchat(userId, customerId) {
        if (!userId || !customerId) {
            throw new common_1.HttpException('Invalid parameters', 500);
        }
        const user = await user_entity_1.default.findOne({
            where: {
                id: userId - parseInt(process.env.BASE_communicate_USER_ID),
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not found a user with ${userId}`, 500);
        }
        const customer = await customer_entity_1.default.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .andWhere(new typeorm_1.Brackets(qb => {
            qb.where('customer.id = :customerId', { customerId })
                .orWhere('customer.mergedCustomers LIKE :str', { str: `(${customerId})` });
        }))
            .getOne();
        if (!customer) {
            throw new common_1.HttpException(`Not found a customer with ${customerId}`, 500);
        }
        const history = await web_chat_history_entity_1.default.find({
            where: {
                customer: {
                    id: customer.id,
                },
            },
        });
        return history;
    },
    async receiveWebchat(createWebchatDto) {
        let customer = null;
        console.log('-----------------receiveWebchat------------------');
        console.log(createWebchatDto);
        if (createWebchatDto.customerId) {
            customer = await customer_entity_1.default.findOne({
                where: [
                    { id: createWebchatDto.customerId },
                    { mergedCustomers: (0, typeorm_1.Like)(`(${createWebchatDto.customerId})`) },
                ],
                relations: ['user'],
            });
        }
        if (!customer) {
            customer = new customer_entity_1.default();
            customer.firstName = 'First';
            customer.lastName = 'Last';
            customer.street = '';
            customer.city = 'Location';
            customer.zipCode = '';
            customer.email = 'Email';
            customer.number = 'Phone';
            customer.status = 'New';
            customer.priority = 'Medium';
            customer.user = await user_entity_1.default.findOne({
                where: {
                    id: parseInt(createWebchatDto.userId) - parseInt(process.env.BASE_communicate_USER_ID),
                },
            });
            customer.agentUser = null;
            if (!customer.user.isLivechatEnabled) {
                return;
            }
            await customer.save();
        }
        else {
            if (!customer.user.isLivechatEnabled) {
                return;
            }
        }
        const webchatHistory = new web_chat_history_entity_1.default();
        webchatHistory.type = 1;
        webchatHistory.body = createWebchatDto.body;
        webchatHistory.bRead = false;
        webchatHistory.customer = customer;
        webchatHistory.attachments = JSON.stringify(createWebchatDto.attachments || []);
        await webchatHistory.save();
        if (customer.status == 'Completed') {
            customer.createdDate = new Date();
            customer.status = 'New';
            customer.agentUser = null;
            await customer.save();
        }
        return {
            webchatHistory,
            userId: customer.user.id,
        };
    },
    async sendWebchat(createWebchatDto) {
        console.log('-----------------sendWebchat------------------');
        console.log(createWebchatDto);
        const customer = await customer_entity_1.default.findOne({
            where: {
                id: createWebchatDto.customerId,
            },
            relations: ['user'],
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 500);
        }
        if (!customer.user || !customer.user.isLivechatEnabled) {
            throw new common_1.HttpException('Cannot send livechat', 500);
        }
        const webchatHistory = new web_chat_history_entity_1.default();
        webchatHistory.type = 0;
        webchatHistory.body = createWebchatDto.body;
        webchatHistory.bRead = false;
        webchatHistory.customer = customer;
        webchatHistory.attachments = JSON.stringify(createWebchatDto.attachments || []);
        await webchatHistory.save();
        return {
            webchatHistory,
            customerId: customer.id,
        };
    },
    async getPossibleCustomer(userId, searchCustomerDto) {
        if (!userId) {
            throw new common_1.HttpException('Invalid parameters', 500);
        }
        const user = await user_entity_1.default.findOne({
            where: {
                id: userId - parseInt(process.env.BASE_communicate_USER_ID),
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not found a user with ${userId}`, 500);
        }
        let customer = await customer_entity_1.default.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .andWhere('customer.email = :email', { email: searchCustomerDto.email })
            .getOne();
        if (customer) {
            return customer;
        }
        customer = new customer_entity_1.default();
        customer.firstName = searchCustomerDto.firstName;
        customer.lastName = searchCustomerDto.lastName;
        customer.street = '';
        customer.city = 'Location';
        customer.zipCode = '';
        customer.email = searchCustomerDto.email;
        customer.number = 'Number';
        customer.status = 'New';
        customer.priority = 'Medium';
        customer.user = user;
        customer.agentUser = null;
        await customer.save();
        return customer;
    },
    async createCustomerFromLiveChat(userId, createCustomerFromLiveChatDto) {
        if (!userId) {
            throw new common_1.HttpException('Invalid parameters', 500);
        }
        const user = await user_entity_1.default.findOne({
            where: {
                id: userId - parseInt(process.env.BASE_communicate_USER_ID),
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not found a user with ${userId}`, 500);
        }
        const existingCustomer = await customer_entity_1.default.findOne({
            where: {
                email: createCustomerFromLiveChatDto.email,
            },
        });
        if (!existingCustomer) {
            throw new common_1.HttpException(`Existing customer with ${createCustomerFromLiveChatDto.email}`, 500);
        }
        const customer = new customer_entity_1.default();
        customer.firstName = createCustomerFromLiveChatDto.firstName;
        customer.lastName = createCustomerFromLiveChatDto.lastName;
        customer.street = '';
        customer.city = 'Location';
        customer.zipCode = '';
        customer.email = createCustomerFromLiveChatDto.email;
        customer.number = 'Number';
        customer.status = 'New';
        customer.priority = 'Medium';
        customer.user = user;
        customer.agentUser = null;
        await customer.save();
        return customer;
    },
});
//# sourceMappingURL=webchat.repository.js.map
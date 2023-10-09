"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../data-source");
const customer_entity_1 = require("../../entity/customer.entity");
const email_history_entity_1 = require("../../entity/email-history.entity");
const facebook_history_entity_1 = require("../../entity/facebook-history.entity");
const message_media_entity_1 = require("../../entity/message-media.entity");
const record_history_entity_1 = require("../../entity/record-history.entity");
const sms_history_entity_1 = require("../../entity/sms-history.entity");
const user_entity_1 = require("../../entity/user.entity");
const voice_history_entity_1 = require("../../entity/voice-history.entity");
const typeorm_1 = require("typeorm");
const axios_1 = require("axios");
const utils_1 = require("../../utils/utils");
const transaction_entity_1 = require("../../entity/transaction.entity");
const web_chat_history_entity_1 = require("../../entity/web-chat-history.entity");
const hd_order_entity_1 = require("../../entity/hd-order.entity");
exports.CustomerRepository = data_source_1.AppDataSource.getRepository(customer_entity_1.default).extend({
    async createCustomer(createCustomerDto, userData) {
        createCustomerDto.number = "+1" + createCustomerDto.number;
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const existingCustomers = await customer_entity_1.default.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('customer.email = :email', { email: createCustomerDto.email })
                .orWhere('customer.number = :number', { number: createCustomerDto.number });
        }))
            .getMany();
        if (existingCustomers.length) {
            throw new common_1.HttpException('Already registered customer with same email or phone number.', 400);
        }
        const customer = new customer_entity_1.default();
        customer.email = createCustomerDto.email;
        customer.firstName = createCustomerDto.firstName;
        customer.lastName = createCustomerDto.lastName;
        customer.number = createCustomerDto.number;
        customer.city = createCustomerDto.city;
        customer.state = createCustomerDto.state;
        customer.zipCode = createCustomerDto.zipCode;
        customer.street = createCustomerDto.street;
        customer.status = createCustomerDto.status;
        customer.department = createCustomerDto.department;
        customer.priority = createCustomerDto.priority;
        customer.agent = createCustomerDto.agent;
        customer.whatsapp = createCustomerDto.whatsapp;
        customer.instagram = createCustomerDto.instagram;
        customer.messenger = createCustomerDto.messenger;
        customer.telegram = createCustomerDto.telegram;
        customer.wechat = createCustomerDto.wechat;
        customer.avatar = createCustomerDto.avatar;
        customer.user = user;
        await customer.save();
        return 'customer created';
    },
    async createCustomers(createCustomerDtos, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        for (const createCustomerDto of createCustomerDtos) {
            createCustomerDto.number = "+1" + createCustomerDto.number;
            const existingCustomers = await customer_entity_1.default.createQueryBuilder('customer')
                .leftJoinAndSelect('customer.user', 'user')
                .where('user.id = :userId', { userId: user.id })
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.where('customer.email = :email', { email: createCustomerDto.email })
                    .orWhere('customer.number = :number', { number: createCustomerDto.number });
            }))
                .getMany();
            if (existingCustomers.length) {
                continue;
            }
            const customer = new customer_entity_1.default();
            customer.email = createCustomerDto.email;
            customer.firstName = createCustomerDto.firstName;
            customer.lastName = createCustomerDto.lastName;
            customer.number = createCustomerDto.number;
            customer.city = createCustomerDto.city;
            customer.state = createCustomerDto.state;
            customer.zipCode = createCustomerDto.zipCode;
            customer.street = createCustomerDto.street;
            customer.status = createCustomerDto.status;
            customer.department = createCustomerDto.department;
            customer.priority = createCustomerDto.priority;
            customer.agent = createCustomerDto.agent;
            customer.whatsapp = createCustomerDto.whatsapp;
            customer.instagram = createCustomerDto.instagram;
            customer.messenger = createCustomerDto.messenger;
            customer.telegram = createCustomerDto.telegram;
            customer.wechat = createCustomerDto.wechat;
            customer.avatar = createCustomerDto.avatar;
            customer.user = user;
            await customer.save();
        }
        return 'customers created';
    },
    async fetchCustomers(userId, adminId, onlyAgent = false) {
        let customers = [];
        if (onlyAgent) {
            customers = await customer_entity_1.default.find({
                where: {
                    agentUserId: userId,
                }
            });
        }
        else if (userId == adminId) {
            customers = await customer_entity_1.default.find({
                where: {
                    user: {
                        id: userId,
                    },
                },
            });
        }
        else {
            customers = await customer_entity_1.default.find({
                where: [
                    {
                        agentUserId: userId,
                    },
                    {
                        userId: adminId,
                        status: 'New',
                    },
                ]
            });
        }
        const ids = customers.map((cust) => cust.id);
        if (!ids.length) {
            return [];
        }
        const sms = await sms_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
            relations: ['media'],
        });
        const emails = await email_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        const webchat = await web_chat_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        const voices = await voice_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
            relations: ['records'],
        });
        const facebook = await facebook_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        const hdOrders = await hd_order_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        for (const customer of customers) {
            customer.sms = sms.filter((item) => item.customerId == customer.id);
            customer.emails = emails.filter((item) => item.customerId == customer.id);
            customer.webchat = webchat.filter((item) => item.customerId == customer.id);
            customer.voices = voices.filter((item) => item.customerId == customer.id);
            customer.facebook = facebook.filter((item) => item.customerId == customer.id);
            customer.hdOrders = hdOrders.filter((item) => item.customerId == customer.id);
        }
        return customers;
    },
    async findCustomers(userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            return [];
        }
        const admin = curUser.admin || curUser;
        const time = new Date().getTime();
        console.time(`findCustomers:${time}`);
        const customers = await exports.CustomerRepository.fetchCustomers(curUser.id, admin.id);
        console.timeEnd(`findCustomers:${time}`);
        for (const customer of customers) {
            customer.sms.sort((a, b) => {
                if (b.createdDate && a.createdDate) {
                    return b.createdDate.getTime() - a.createdDate.getTime();
                }
                else if (a.createdDate) {
                    return -1;
                }
                else if (b.createdDate) {
                    return 1;
                }
                return 0;
            });
            customer.emails.sort((a, b) => {
                if (b.createdDate && a.createdDate) {
                    return b.createdDate.getTime() - a.createdDate.getTime();
                }
                else if (a.createdDate) {
                    return -1;
                }
                else if (b.createdDate) {
                    return 1;
                }
                return 0;
            });
            customer.voices.sort((a, b) => {
                if (b.createdDate && a.createdDate) {
                    return b.createdDate.getTime() - a.createdDate.getTime();
                }
                else if (a.createdDate) {
                    return -1;
                }
                else if (b.createdDate) {
                    return 1;
                }
                return 0;
            });
            customer.facebook.sort((a, b) => {
                if (b.createdDate && a.createdDate) {
                    return b.createdDate.getTime() - a.createdDate.getTime();
                }
                else if (a.createdDate) {
                    return -1;
                }
                else if (b.createdDate) {
                    return 1;
                }
                return 0;
            });
            customer.webchat.sort((a, b) => {
                if (b.createdDate && a.createdDate) {
                    return b.createdDate.getTime() - a.createdDate.getTime();
                }
                else if (a.createdDate) {
                    return -1;
                }
                else if (b.createdDate) {
                    return 1;
                }
                return 0;
            });
            let latest = {
                obj: null,
                history_type: 'SMS',
            };
            if (customer.sms.length) {
                latest.obj = customer.sms[0];
            }
            if (customer.emails.length) {
                const latestEmail = customer.emails[0];
                if (!latest.obj) {
                    latest.obj = latestEmail;
                    latest.history_type = 'Email';
                }
                else {
                    if (latest.obj.createdDate.getTime() < latestEmail.createdDate.getTime()) {
                        latest.obj = latestEmail;
                        latest.history_type = 'Email';
                    }
                }
            }
            if (customer.voices.length) {
                const latestVoice = customer.voices[0];
                if (!latest.obj) {
                    latest.obj = latestVoice;
                    latest.history_type = 'Voice';
                }
                else {
                    if (latest.obj.createdDate.getTime() < latestVoice.createdDate.getTime()) {
                        latest.obj = latestVoice;
                        latest.history_type = 'Voice';
                    }
                }
            }
            if (customer.facebook.length) {
                const latestFacebookMsg = customer.facebook[0];
                if (!latest.obj) {
                    latest.obj = latestFacebookMsg;
                    latest.history_type = 'Messenger';
                }
                else {
                    if (latest.obj.createdDate.getTime() < latestFacebookMsg.createdDate.getTime()) {
                        latest.obj = latestFacebookMsg;
                        latest.history_type = 'Messenger';
                    }
                }
            }
            if (customer.webchat.length) {
                const latestWebchat = customer.webchat[0];
                if (!latest.obj) {
                    latest.obj = latestWebchat;
                    latest.history_type = 'LiveChat';
                }
                else {
                    if (latest.obj.createdDate.getTime() < latestWebchat.createdDate.getTime()) {
                        latest.obj = latestWebchat;
                        latest.history_type = 'LiveChat';
                    }
                }
            }
            customer['latest'] = latest;
        }
        customers.sort((a, b) => {
            if (a['latest'].obj && b['latest'].obj) {
                return b['latest'].obj.createdDate.getTime() - a['latest'].obj.createdDate.getTime();
            }
            else if (b['latest'].obj) {
                return 1;
            }
            else if (a['latest'].obj) {
                return -1;
            }
            return 0;
        });
        return customers;
    },
    async findCustomer(id) {
        const time = new Date().getTime();
        console.log('findCustomer@begin', time);
        console.time(`findCustomer:${time}`);
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        const sms = await sms_history_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
            relations: ['media'],
        });
        const emails = await email_history_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
        });
        const webchat = await web_chat_history_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
        });
        const voices = await voice_history_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
            relations: ['records'],
        });
        const facebook = await facebook_history_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
        });
        const hdOrders = await hd_order_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
        });
        customer.sms = sms;
        customer.emails = emails;
        customer.webchat = webchat;
        customer.voices = voices;
        customer.facebook = facebook;
        customer.hdOrders = hdOrders;
        console.timeEnd(`findCustomer:${time}`);
        console.log('findCustomer@finish', time);
        if (customer) {
            customer.emails.sort((a, b) => {
                if (b.createdDate && a.createdDate) {
                    return b.createdDate.getTime() - a.createdDate.getTime();
                }
                else if (a.createdDate) {
                    return -1;
                }
                else if (b.createdDate) {
                    return 1;
                }
                return 0;
            });
            const latestReceivedEmail = customer.emails.find((email) => email.id);
            customer['latestReceivedEmail'] = latestReceivedEmail;
        }
        return customer;
    },
    async removeCustomer(id) {
        const smsHistories = await sms_history_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (smsHistories.length) {
            const media = await message_media_entity_1.default.find({
                where: {
                    message: {
                        id: (0, typeorm_1.In)(smsHistories.map((vh) => vh.id)),
                    },
                }
            });
            if (media.length) {
                await message_media_entity_1.default.remove(media);
            }
            await sms_history_entity_1.default.remove(smsHistories);
        }
        const emailHistories = await email_history_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (emailHistories.length) {
            await email_history_entity_1.default.remove(emailHistories);
        }
        const voiceHistories = await voice_history_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (voiceHistories.length) {
            const recordHistories = await record_history_entity_1.default.find({
                where: {
                    voiceHistory: {
                        id: (0, typeorm_1.In)(voiceHistories.map((vh) => vh.id)),
                    },
                },
            });
            if (recordHistories.length) {
                await record_history_entity_1.default.remove(recordHistories);
            }
            await voice_history_entity_1.default.remove(voiceHistories);
        }
        const facebookHistories = await facebook_history_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (facebookHistories.length) {
            await facebook_history_entity_1.default.remove(facebookHistories);
        }
        const webchatHistories = await web_chat_history_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (webchatHistories.length) {
            await web_chat_history_entity_1.default.remove(webchatHistories);
        }
        const transactions = await transaction_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (transactions.length) {
            await transaction_entity_1.default.remove(transactions);
        }
        const hdOrders = await hd_order_entity_1.default.find({
            where: {
                customer: {
                    id: id,
                },
            },
        });
        if (hdOrders.length) {
            await hd_order_entity_1.default.remove(hdOrders);
        }
        await customer_entity_1.default.delete(id);
    },
    async getMaxId() {
        const maxId = await customer_entity_1.default.createQueryBuilder('customer')
            .select('MAX(customer.id)', 'maxId')
            .getRawOne();
        if (maxId) {
            return maxId.maxId + 1;
        }
        return 1;
    },
    async updateCustomer(id, updateCustomerDto, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const existingCustomers = await customer_entity_1.default.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('customer.email = :email', { email: updateCustomerDto.email })
                .orWhere('customer.number = :number', { number: updateCustomerDto.number });
        }))
            .andWhere('customer.id <> :customerId', { customerId: id })
            .getMany();
        if (existingCustomers.length) {
            throw new common_1.HttpException('Already registered customer with same email or phone number.', 400);
        }
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 401);
        }
        customer.email = updateCustomerDto.email;
        customer.firstName = updateCustomerDto.firstName;
        customer.lastName = updateCustomerDto.lastName;
        customer.number = updateCustomerDto.number;
        customer.street = updateCustomerDto.street;
        customer.city = updateCustomerDto.city;
        customer.state = updateCustomerDto.state;
        customer.status = updateCustomerDto.status;
        customer.department = updateCustomerDto.department;
        customer.priority = updateCustomerDto.priority;
        customer.agent = updateCustomerDto.agent;
        customer.whatsapp = updateCustomerDto.whatsapp;
        customer.instagram = updateCustomerDto.instagram;
        customer.messenger = updateCustomerDto.messenger;
        customer.telegram = updateCustomerDto.telegram;
        customer.wechat = updateCustomerDto.wechat;
        customer.avatar = updateCustomerDto.avatar;
        await customer.save();
        return 'updated';
    },
    async removeByIds(ids) {
        if (!ids.length) {
            return 'failed';
        }
        const smsHistories = await sms_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (smsHistories.length) {
            await sms_history_entity_1.default.remove(smsHistories);
        }
        const emailHistories = await email_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (emailHistories.length) {
            await email_history_entity_1.default.remove(emailHistories);
        }
        const voiceHistories = await voice_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (voiceHistories.length) {
            const recordHistories = await record_history_entity_1.default.find({
                where: {
                    voiceHistory: {
                        id: (0, typeorm_1.In)(voiceHistories.map((vh) => vh.id)),
                    },
                },
            });
            if (recordHistories.length) {
                await record_history_entity_1.default.remove(recordHistories);
            }
            await voice_history_entity_1.default.remove(voiceHistories);
        }
        const facebookHistories = await facebook_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (facebookHistories.length) {
            await facebook_history_entity_1.default.remove(facebookHistories);
        }
        const webchatHistories = await web_chat_history_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (webchatHistories.length) {
            await web_chat_history_entity_1.default.remove(webchatHistories);
        }
        const transactions = await transaction_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (transactions.length) {
            await transaction_entity_1.default.remove(transactions);
        }
        const hdOrders = await hd_order_entity_1.default.find({
            where: {
                customer: {
                    id: (0, typeorm_1.In)(ids),
                },
            },
        });
        if (hdOrders.length) {
            await hd_order_entity_1.default.remove(hdOrders);
        }
        if (ids.length) {
            await customer_entity_1.default.delete(ids);
        }
        return 'deleted';
    },
    async updateStatus(id, status, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 401);
        }
        customer.status = status;
        if (status == 'Completed') {
            customer.resolutionTime = (new Date()).getTime() - customer.createdDate.getTime();
            customer.completedDate = new Date();
        }
        else if (status == 'Progress') {
            customer.agentUser = curUser;
        }
        await customer.save();
        return 'updated';
    },
    async updateAvatar(id, avatar, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 401);
        }
        customer.avatar = avatar;
        await customer.save();
        return customer;
    },
    async updateDepartment(id, department, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 401);
        }
        customer.department = department;
        await customer.save();
        return 'updated';
    },
    async updatePriority(id, priority, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 401);
        }
        customer.priority = priority;
        await customer.save();
        return 'updated';
    },
    async updateAgent(id, agent, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 401);
        }
        customer.agent = agent;
        await customer.save();
        return 'updated';
    },
    async mergeCustomerForFacebook(customerId1, customerId2) {
        console.log('mergeCustomerForFacebook');
        const fromCustomer = await customer_entity_1.default.findOne({
            where: {
                id: customerId1,
            },
            relations: ['sms', 'emails', 'voices', 'facebook', 'webchat'],
        });
        if (!fromCustomer) {
            throw new common_1.HttpException(`Not found a customer with ${customerId1}`, 500);
        }
        let merged = false;
        const toCustomer = await customer_entity_1.default.findOne({
            where: {
                id: customerId2,
            },
        });
        if (!toCustomer) {
            throw new common_1.HttpException(`Not found a customer with ${customerId2}`, 500);
        }
        const hasReceivedSms = fromCustomer.sms.some((e) => e.type);
        if (hasReceivedSms) {
            merged = true;
            toCustomer.number = fromCustomer.number;
            await toCustomer.save();
            const smsHistories = await sms_history_entity_1.default.find({
                where: {
                    customer: {
                        id: customerId1,
                    },
                },
            });
            for (const smsHistory of smsHistories) {
                smsHistory.customer = toCustomer;
                await smsHistory.save();
            }
        }
        const hasReceivedEmails = fromCustomer.emails.some((e) => e.type);
        if (hasReceivedEmails) {
            merged = true;
            toCustomer.email = fromCustomer.email;
            await toCustomer.save();
            const emailHistories = await email_history_entity_1.default.find({
                where: {
                    customer: {
                        id: customerId1,
                    },
                },
            });
            for (const emailHistory of emailHistories) {
                emailHistory.customer = toCustomer;
                await emailHistory.save();
            }
        }
        const hasReceivedVoices = fromCustomer.voices.some((e) => e.type);
        if (hasReceivedVoices) {
            merged = true;
            toCustomer.number = fromCustomer.number;
            await toCustomer.save();
            const voiceHistories = await voice_history_entity_1.default.find({
                where: {
                    customer: {
                        id: customerId1,
                    },
                },
            });
            for (const voiceHistory of voiceHistories) {
                voiceHistory.customer = toCustomer;
                await voiceHistory.save();
            }
        }
        const hasReceivedFacebook = fromCustomer.facebook.some((e) => e.type);
        if (hasReceivedFacebook) {
            merged = true;
            toCustomer.facebookMessageSid = fromCustomer.facebookMessageSid;
            await toCustomer.save();
            const facebookHistories = await facebook_history_entity_1.default.find({
                where: {
                    customer: {
                        id: customerId1,
                    },
                },
            });
            for (const facebookHistory of facebookHistories) {
                facebookHistory.customer = toCustomer;
                await facebookHistory.save();
            }
        }
        const hasReceivedWebchat = fromCustomer.webchat.some((e) => e.type);
        if (hasReceivedWebchat) {
            merged = true;
            const webchatHistories = await web_chat_history_entity_1.default.find({
                where: {
                    customer: {
                        id: customerId1,
                    },
                },
            });
            for (const webchatHistory of webchatHistories) {
                webchatHistory.customer = toCustomer;
                await webchatHistory.save();
            }
        }
        if (merged) {
            if (toCustomer.mergedCustomers) {
                toCustomer.mergedCustomers += `(${customerId1})`;
            }
            else {
                toCustomer.mergedCustomers = `(${customerId1})`;
            }
            toCustomer.status = fromCustomer.status;
            await toCustomer.save();
            return {
                id: toCustomer.id
            };
        }
        return null;
    },
    async importFromHD(userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const resp = await axios_1.default.get('https://homesellphotography.hd.pics/api/v1/users', {
            headers: {
                'api_key': user.hdApiKey,
            }
        });
        console.log('importFromHD', resp.data.length);
        console.log('user', user);
        let customers = [];
        let count = 3;
        for (const customer of resp.data) {
            count--;
            if (count == 0) {
                break;
            }
            customers.push({
                firstName: customer.firstname,
                lastName: customer.lastname,
                number: '+1' + (0, utils_1.convertToNumber)(customer.phone),
                email: customer.email,
                user: user,
                uid: customer.uid,
                bid: customer.bid,
            });
        }
        await customer_entity_1.default.insert(customers);
        return 'import success';
    },
    async importTransactionsFromHD(userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customers = await customer_entity_1.default.find({
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        for (const customer of customers) {
            if (!customer.uid) {
                continue;
            }
            console.log('customer uid=', customer.uid);
            const resp = await axios_1.default.get(`https://homesellphotography.hd.pics/api/v1/user/transactions?uid=${customer.uid}`, {
                headers: {
                    'api_key': user.hdApiKey,
                }
            });
            console.log('importTransactionsFromHD', resp.data);
            let transactions = [];
            for (const data of resp.data) {
                transactions.push(Object.assign(Object.assign({}, data), { customer }));
            }
            await data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into(transaction_entity_1.default)
                .values(transactions)
                .execute();
        }
        return 'import success';
    },
    async updateEmail(id, email, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        const existingCustomer = await customer_entity_1.default.findOne({
            where: {
                id: (0, typeorm_1.Not)(id),
                email,
            },
        });
        if (existingCustomer) {
            throw new common_1.HttpException('Existing customer with a same email', 400);
        }
        customer.email = email;
        await customer.save();
        return 'updated';
    },
    async updateNumber(id, number, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        const existingCustomer = await customer_entity_1.default.findOne({
            where: {
                id: (0, typeorm_1.Not)(id),
                number,
            },
        });
        if (existingCustomer) {
            throw new common_1.HttpException('Existing customer with a same number', 400);
        }
        customer.number = number;
        await customer.save();
        return 'updated';
    },
    async updateName(id, name, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        const arr = (name || '').split(' ');
        customer.firstName = arr[0];
        customer.lastName = arr[1];
        await customer.save();
        return 'updated';
    },
    async updateCityState(id, name, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        const arr = (name || '').split(',');
        customer.city = arr[0];
        customer.state = arr[1];
        await customer.save();
        return 'updated';
    },
    async updateStreet(id, name, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        customer.street = name;
        await customer.save();
        return 'updated';
    },
    async updateFacebookMessengerId(id, messageSid, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        customer.facebookMessageSid = messageSid;
        await customer.save();
        return 'updated';
    },
    async getTransactions(id) {
        const customer = await customer_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            return [];
        }
        const transactions = await transaction_entity_1.default.find({
            where: {
                customer: {
                    id,
                },
            },
        });
        return transactions;
    },
    async importOrdersFromHD(customerId, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id: customerId,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 400);
        }
        if (!customer.uid) {
            throw new common_1.HttpException('No HDHub Customer', 400);
        }
        const resp1 = await axios_1.default.get(`https://homesellphotography.hd.pics/api/v1/orders?uid=${customer.uid}`, {
            headers: {
                'api_key': user.hdApiKey,
            }
        });
        console.log(resp1.data);
        for (const order of resp1.data) {
            const sid = order.sid;
            const resp = await axios_1.default.get(`https://homesellphotography.hd.pics/api/v1/site?sid=${sid}`, {
                headers: {
                    'api_key': user.hdApiKey,
                },
            });
            const site = resp.data;
            const hdOrder = new hd_order_entity_1.default();
            hdOrder.oid = order.oid;
            hdOrder.bid = order.bid;
            hdOrder.sid = order.sid;
            hdOrder.date = order.date;
            hdOrder.tasks = JSON.stringify(order.tasks);
            hdOrder.subtotal = order.subtotal;
            hdOrder.taxamount = order.taxamount;
            hdOrder.balancedue = order.balancedue;
            hdOrder.total = order.total;
            hdOrder.invoiceurl = order.invoiceurl;
            hdOrder.taxes = JSON.stringify(order.taxes);
            hdOrder.payments = JSON.stringify(order.payments);
            hdOrder.status = site.status;
            hdOrder.purchased = site.purchased;
            hdOrder.address = site.address;
            hdOrder.city = site.city;
            hdOrder.state = site.state;
            hdOrder.zip = site.zip;
            hdOrder.beds = site.beds;
            hdOrder.baths = site.baths;
            hdOrder.sqft = site.sqft;
            hdOrder.created = site.created;
            hdOrder.customer = customer;
            hdOrder.url = site.media[0] && site.media[0].url;
            await hdOrder.save();
        }
        return {
            order: resp1.data,
        };
    },
    async getWebhooks(customerId, userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const customer = await customer_entity_1.default.findOne({
            where: {
                id: customerId,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 400);
        }
        const resp = await axios_1.default.get(`https://homesellphotography.hd.pics/api/v1/webhooks`, {
            headers: {
                'api_key': user.hdApiKey,
            },
        });
        const resp1 = await axios_1.default.get(`https://homesellphotography.hd.pics/api/v1/webhook/events`, {
            headers: {
                'api_key': user.hdApiKey,
            },
        });
        return {
            webhooks: resp.data,
            events: resp1.data,
        };
    },
    async getResponseTime(userData) {
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const user = curUser.admin || curUser;
        const custs = await customer_entity_1.default.createQueryBuilder('cust')
            .leftJoinAndSelect('cust.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .getMany();
        if (!custs.length) {
            return 0;
        }
        let responseTime = 0;
        for (const cust of custs) {
            if (cust.responseTime) {
                responseTime += cust.responseTime;
            }
        }
        const ids = custs.filter((cust) => !cust.responseTime).map((cust) => cust.id);
        console.log('ids', ids);
        if (!ids.length) {
            return Math.ceil(responseTime / custs.length);
        }
        const customers = await customer_entity_1.default.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.user', 'user')
            .leftJoinAndSelect('customer.sms', 'sms')
            .leftJoinAndSelect('customer.emails', 'emails')
            .leftJoinAndSelect('customer.webchat', 'webchat')
            .leftJoinAndSelect('customer.facebook', 'facebook')
            .leftJoinAndSelect('customer.voices', 'voices')
            .where('customer.id IN (:...ids)', { ids })
            .getMany();
        for (const customer of customers) {
            const arr = [
                ...customer.sms,
                ...customer.emails,
                ...customer.webchat,
                ...customer.facebook,
                ...customer.voices,
            ];
            arr.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
            let respTime = 0;
            if (arr.length > 2) {
                if (arr[0].type == 0) {
                    continue;
                }
                const first = arr[0].createdDate.getTime();
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].type == 1) {
                        respTime = arr[i].createdDate.getTime() - first;
                        break;
                    }
                }
            }
            customer.responseTime = respTime;
            await customer.save();
            responseTime += respTime;
        }
        return Math.ceil(responseTime / custs.length);
    },
    async getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId) {
        const stDate = (0, utils_1.convertDate)(startDate);
        const edDate = (0, utils_1.convertDate)(endDate);
        const curUser = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!curUser) {
            throw new common_1.HttpException('Unregistered User', 401);
        }
        const admin = curUser.admin || curUser;
        let customers = [];
        if (agentId) {
            customers = await exports.CustomerRepository.fetchCustomers(agentId, admin.id, true);
        }
        else {
            customers = await exports.CustomerRepository.fetchCustomers(admin.id, admin.id);
        }
        const totalEmails = [];
        const totalSMS = [];
        const totalVoices = [];
        const totalFacebook = [];
        const totalLivechat = [];
        for (const customer of customers) {
            totalEmails.push(...customer.emails.filter((msg) => msg.type));
            totalSMS.push(...customer.sms.filter((msg) => msg.type));
            totalVoices.push(...customer.voices.filter((msg) => msg.type));
            totalFacebook.push(...customer.facebook.filter((msg) => msg.type));
            totalLivechat.push(...customer.webchat.filter((msg) => msg.type));
        }
        const result = {
            'email': (0, utils_1.getChartDataForRange)(totalEmails, stDate, edDate, duration),
            'sms': (0, utils_1.getChartDataForRange)(totalSMS, stDate, edDate, duration),
            'calls': (0, utils_1.getChartDataForRange)(totalVoices, stDate, edDate, duration),
            'messenger': (0, utils_1.getChartDataForRange)(totalFacebook, stDate, edDate, duration),
            'livechat': (0, utils_1.getChartDataForRange)(totalLivechat, stDate, edDate, duration),
        };
        return result;
    },
});
//# sourceMappingURL=customer.repository.js.map
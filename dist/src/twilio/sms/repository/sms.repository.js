"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSRepository = void 0;
const data_source_1 = require("../../../data-source");
const customer_entity_1 = require("../../../entity/customer.entity");
const message_media_entity_1 = require("../../../entity/message-media.entity");
const sms_history_entity_1 = require("../../../entity/sms-history.entity");
const user_entity_1 = require("../../../entity/user.entity");
exports.SMSRepository = data_source_1.AppDataSource.getRepository(sms_history_entity_1.default).extend({
    async getSMSHistoryList(customerId) {
        const customer = await customer_entity_1.default.findOne({
            where: {
                id: customerId,
            },
        });
        if (!customer) {
            return [];
        }
        const smsHistories = await sms_history_entity_1.default.find({
            where: {
                customer: {
                    id: customer.id,
                },
            },
        });
        return smsHistories;
    },
    async createSMSHistory(res, userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            return null;
        }
        let customer = await customer_entity_1.default.findOne({
            where: {
                number: res.to,
                user: {
                    id: user.id,
                },
            },
        });
        if (!customer) {
            customer = new customer_entity_1.default();
            customer.firstName = 'First';
            customer.lastName = 'Last';
            customer.street = '';
            customer.city = 'Location';
            customer.zipCode = '';
            customer.email = 'Email';
            customer.number = res.to;
            customer.status = 'New';
            customer.priority = 'Medium';
            customer.agentUser = null;
            customer.user = user;
            await customer.save();
        }
        const smsHistory = new sms_history_entity_1.default();
        smsHistory.type = 0;
        smsHistory.body = res.body;
        smsHistory.numSegments = res.numSegments;
        smsHistory.direction = res.direction;
        smsHistory.from = res.from;
        smsHistory.to = res.to;
        smsHistory.dateUpdated = res.dateUpdated;
        smsHistory.price = res.price;
        smsHistory.errorMessage = res.errorMessage;
        smsHistory.uri = res.uri;
        smsHistory.accountSid = res.accountSid;
        smsHistory.numMedia = res.numMedia;
        smsHistory.status = res.status;
        smsHistory.messagingServiceSid = res.messagingServiceSid;
        smsHistory.sid = res.sid;
        smsHistory.dateSent = res.dateSent;
        smsHistory.dateCreated = res.dateCreated;
        smsHistory.errorCode = res.errorCode;
        smsHistory.priceUnit = res.priceUnit;
        smsHistory.apiVersion = res.apiVersion;
        smsHistory.subresourceUris = JSON.stringify(res.subresourceUris);
        smsHistory.customer = customer;
        await smsHistory.save();
        if (customer.status == 'Completed') {
            customer.createdDate = new Date();
            customer.status = 'New';
            customer.agentUser = null;
            await customer.save();
        }
        return smsHistory;
    },
    async saveReceivedSMS(body) {
        const user = await user_entity_1.default.findOne({
            where: {
                phoneNumber: body.To,
            },
        });
        if (!user) {
            console.log('=======> Unregistered communicate number', body.To);
            return null;
        }
        let customer = await customer_entity_1.default.findOne({
            where: {
                number: body.From,
                user: {
                    id: user.id,
                },
            },
        });
        if (!customer) {
            customer = new customer_entity_1.default();
            customer.firstName = 'First';
            customer.lastName = 'Last';
            customer.street = '';
            customer.city = body.FromCity;
            customer.zipCode = body.FromZip;
            customer.email = 'Email';
            customer.number = body.From;
            customer.status = 'New';
            customer.priority = 'Medium';
            customer.user = user;
            customer.agentUser = null;
            await customer.save();
        }
        const smsHistory = new sms_history_entity_1.default();
        smsHistory.type = 1;
        smsHistory.messageSid = body.MessageSid;
        smsHistory.body = body.Body;
        smsHistory.from = body.From;
        smsHistory.to = body.To;
        smsHistory.toCountry = body.ToCountry;
        smsHistory.toState = body.ToState;
        smsHistory.smsMessageSid = body.SmsMessageSid;
        smsHistory.numMedia = body.NumMedia;
        smsHistory.toCity = body.ToCity;
        smsHistory.fromZip = body.FromZip;
        smsHistory.smsSid = body.SmsSid;
        smsHistory.fromState = body.FromState;
        smsHistory.smsStatus = body.SmsStatus;
        smsHistory.fromCity = body.FromCity;
        smsHistory.fromCountry = body.FromCountry;
        smsHistory.messagingServiceSid = body.MessagingServiceSid;
        smsHistory.toZip = body.ToZip;
        smsHistory.numSegments = body.NumSegments;
        smsHistory.referralNumMedia = body.ReferralNumMedia;
        smsHistory.accountSid = body.AccountSid;
        smsHistory.apiVersion = body.ApiVersion;
        smsHistory.customer = customer;
        await smsHistory.save();
        for (let i = 0; i < +body.NumMedia; i++) {
            const messageMedia = new message_media_entity_1.default();
            messageMedia.contentType = body[`MediaContentType${i}`];
            messageMedia.url = body[`MediaUrl${i}`];
            messageMedia.message = smsHistory;
            await messageMedia.save();
        }
        if (customer.status == 'Completed') {
            customer.createdDate = new Date();
            customer.status = 'New';
            customer.agentUser = null;
            await customer.save();
        }
        return { smsHistory, userId: user.id };
    },
});
//# sourceMappingURL=sms.repository.js.map
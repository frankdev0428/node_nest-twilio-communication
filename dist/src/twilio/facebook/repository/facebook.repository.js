"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookRepository = void 0;
const data_source_1 = require("../../../data-source");
const customer_entity_1 = require("../../../entity/customer.entity");
const facebook_history_entity_1 = require("../../../entity/facebook-history.entity");
const user_entity_1 = require("../../../entity/user.entity");
const twilio = require("twilio");
const Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
exports.FacebookRepository = data_source_1.AppDataSource.getRepository(facebook_history_entity_1.default).extend({
    async receiveFacebookMessage(body) {
        console.log('----------------------------receiveFacebookMessage------------------------');
        console.log(body);
        const user = await user_entity_1.default.findOne({
            where: {
                facebookMessageSid: body.To,
            },
        });
        if (!user) {
            console.log('=======> Unregistered communicate facebook messageSid', body.To);
            return null;
        }
        if (!user.isFacebookEnabled) {
            console.log('=======> Not able to process facebook message', body.To);
            return null;
        }
        let customer = await customer_entity_1.default.findOne({
            where: {
                facebookMessageSid: body.From,
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
            customer.number = 'Phone';
            customer.status = 'New';
            customer.priority = 'Medium';
            customer.facebookMessageSid = body.From;
            customer.agentUser = null;
            customer.user = user;
            await customer.save();
        }
        const facebookHistory = new facebook_history_entity_1.default();
        facebookHistory.type = 1;
        facebookHistory.messageSid = body.MessageSid;
        facebookHistory.body = body.Body;
        facebookHistory.from = body.From;
        facebookHistory.to = body.To;
        facebookHistory.smsMessageSid = body.SmsMessageSid;
        facebookHistory.numMedia = body.NumMedia;
        facebookHistory.smsSid = body.SmsSid;
        facebookHistory.smsStatus = body.SmsStatus;
        facebookHistory.numSegments = body.NumSegments;
        facebookHistory.referralNumMedia = body.ReferralNumMedia;
        facebookHistory.accountSid = body.AccountSid;
        facebookHistory.apiVersion = body.ApiVersion;
        facebookHistory.customer = customer;
        await facebookHistory.save();
        if (customer.status == 'Completed') {
            customer.createdDate = new Date();
            customer.status = 'New';
            customer.agentUser = null;
            await customer.save();
        }
        return { facebookHistory, userId: user.id };
    },
    async sendMessage(sendFacebookDto, userData) {
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
                facebookMessageSid: sendFacebookDto.to,
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
            customer.city = '';
            customer.zipCode = 'Location';
            customer.email = 'Email';
            customer.facebookMessageSid = sendFacebookDto.to;
            customer.status = 'New';
            customer.priority = 'Medium';
            customer.agentUser = null;
            customer.user = user;
            await customer.save();
        }
        const res = await Client.messages
            .create({
            body: sendFacebookDto.content,
            from: user.facebookMessageSid,
            to: sendFacebookDto.to,
        });
        const facebookHistory = new facebook_history_entity_1.default();
        facebookHistory.type = 0;
        facebookHistory.body = res.body;
        facebookHistory.numSegments = res.numSegments;
        facebookHistory.from = res.from;
        facebookHistory.to = res.to;
        facebookHistory.accountSid = res.accountSid;
        facebookHistory.numMedia = res.numMedia;
        facebookHistory.messageSid = res.sid;
        facebookHistory.apiVersion = res.apiVersion;
        facebookHistory.customer = customer;
        await facebookHistory.save();
        return facebookHistory;
    },
});
//# sourceMappingURL=facebook.repository.js.map
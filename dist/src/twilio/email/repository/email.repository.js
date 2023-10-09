"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRepository = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const email_history_entity_1 = require("../../../entity/email-history.entity");
const user_entity_1 = require("../../../entity/user.entity");
const nodemailer = require("nodemailer");
const customer_entity_1 = require("../../../entity/customer.entity");
exports.EmailRepository = data_source_1.AppDataSource.getRepository(email_history_entity_1.default).extend({
    async sendEmailWithNewSubject(createEmailDto, userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user || !user.isEmailEnabled || !user.businessEmail) {
            throw new common_1.HttpException('Unregistered User', 500);
        }
        const customer = await customer_entity_1.default.findOne({
            where: {
                id: createEmailDto.customerId,
            },
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 500);
        }
        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            type: "SMTP",
            port: 587,
            secure: false,
            auth: {
                user: user.businessEmail,
                pass: user.appPassword,
            }
        });
        const mailOption = {
            from: user.businessEmail,
            to: createEmailDto.email,
            subject: createEmailDto.subject,
            text: createEmailDto.content,
        };
        try {
            const resp = await transport.sendMail(mailOption);
            const emailHistory = new email_history_entity_1.default();
            emailHistory.type = 0;
            emailHistory.fromEmail = user.businessEmail;
            emailHistory.toEmail = createEmailDto.email;
            emailHistory.subject = mailOption.subject;
            emailHistory.content = createEmailDto.content;
            emailHistory.customer = customer;
            await emailHistory.save();
            return emailHistory;
        }
        catch (e) {
            throw new common_1.HttpException('Failed to send email: ' + e.message, 500);
        }
    },
    async replyEmail(createEmailDto, userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user || !user.isEmailEnabled || !user.businessEmail) {
            throw new common_1.HttpException('Unregistered User', 500);
        }
        const customer = await customer_entity_1.default.findOne({
            where: {
                id: createEmailDto.customerId,
            },
            relations: ['emails'],
        });
        if (!customer) {
            throw new common_1.HttpException('Unregistered Customer', 500);
        }
        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            type: "SMTP",
            port: 465,
            secure: true,
            auth: {
                user: user.businessEmail,
                pass: user.appPassword,
            }
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
        const latestReceivedEmail = customer.emails.find((email) => email.id);
        let subject = createEmailDto.subject;
        let messageId = "";
        console.log('latestReceivedEmail', latestReceivedEmail);
        if (latestReceivedEmail && subject == latestReceivedEmail.subject) {
            messageId = latestReceivedEmail.messageId;
        }
        const mailOption = {
            from: user.businessEmail,
            to: createEmailDto.email,
            subject,
            html: createEmailDto.content,
            inReplyTo: messageId,
            references: [messageId],
            attachments: createEmailDto.attachments || [],
        };
        console.log(mailOption);
        try {
            const resp = await transport.sendMail(mailOption);
            console.log(resp);
            const emailHistory = new email_history_entity_1.default();
            emailHistory.type = 0;
            emailHistory.fromEmail = user.businessEmail;
            emailHistory.toEmail = createEmailDto.email;
            emailHistory.subject = mailOption.subject;
            emailHistory.content = createEmailDto.content;
            emailHistory.customer = customer;
            emailHistory.messageId = resp.messageId;
            await emailHistory.save();
            return emailHistory;
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException('Failed to send email: ' + e.message, 500);
        }
    },
    async receiveEmail(from, to, subject, text, content, messageId) {
        const user = await user_entity_1.default.findOne({
            where: {
                businessEmail: to,
            },
        });
        if (!user || !user.isEmailEnabled || !user.businessEmail) {
            return { emailHistory: null, userId: null };
        }
        let customer = await customer_entity_1.default.findOne({
            where: {
                user: {
                    id: user.id,
                },
                email: from,
            },
        });
        if (!customer) {
            customer = new customer_entity_1.default();
            customer.firstName = 'First';
            customer.lastName = 'Last';
            customer.street = '';
            customer.city = 'Location';
            customer.zipCode = '';
            customer.email = from;
            customer.number = 'Phone';
            customer.status = 'New';
            customer.priority = 'Medium';
            customer.agentUser = null;
            customer.user = user;
            await customer.save();
        }
        console.log('------------------------------content---------------------------', content);
        if (content) {
            let pos = content.indexOf('\n--');
            if (pos != -1) {
                content = content.substr(0, pos);
            }
        }
        const existingEmailHistory = await email_history_entity_1.default.findOne({
            where: {
                messageId,
            },
        });
        if (existingEmailHistory) {
            return;
        }
        const emailHistory = new email_history_entity_1.default();
        emailHistory.type = 1;
        emailHistory.subject = subject;
        emailHistory.fromEmail = from;
        emailHistory.toEmail = to;
        emailHistory.content = content;
        emailHistory.text = text;
        emailHistory.messageId = messageId;
        emailHistory.customer = customer;
        await emailHistory.save();
        if (customer.status == 'Completed') {
            customer.createdDate = new Date();
            customer.status = 'New';
            customer.agentUser = null;
            await customer.save();
        }
        return { emailHistory, userId: user.id };
    },
});
//# sourceMappingURL=email.repository.js.map
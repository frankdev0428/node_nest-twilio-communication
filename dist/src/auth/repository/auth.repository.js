"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entity/user.entity");
const utils_1 = require("../../utils/utils");
const customer_repository_1 = require("../../customer/repository/customer.repository");
const imap_1 = require("../../utils/imap");
const twilio = require("twilio");
const port_order_entity_1 = require("../../entity/port-order.entity");
const customer_entity_1 = require("../../entity/customer.entity");
const voice_history_entity_1 = require("../../entity/voice-history.entity");
const utils_2 = require("../../utils/utils");
const Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
exports.AuthRepository = data_source_1.AppDataSource.getRepository(user_entity_1.default).extend({
    async login(loginUserDto) {
        const user = await user_entity_1.default.findOne({
            where: {
                email: loginUserDto.email,
            },
        });
        console.log(loginUserDto);
        if (!user) {
            throw new common_1.HttpException('Unregistered User', 400);
        }
        const validPassword = await bcrypt.compare(loginUserDto.password, user.password);
        if (!validPassword) {
            throw new common_1.HttpException('Invalid Password', 401);
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        const token = utils_1.jwt.sign(payload);
        user.loginToken = token;
        await user.save();
        return token;
    },
    async signup(signupUserDto) {
        const oldUser = await user_entity_1.default.findOne({
            where: [
                { email: signupUserDto.email },
                { phoneNumber: signupUserDto.phoneNumber },
            ],
        });
        if (oldUser) {
            throw new common_1.HttpException('Already registered user', 400);
        }
        const user = new user_entity_1.default();
        const salt = await bcrypt.genSalt(10);
        user.email = signupUserDto.email;
        user.password = await bcrypt.hash(signupUserDto.password, salt);
        user.phoneNumber = signupUserDto.phoneNumber;
        user.firstName = signupUserDto.firstName;
        user.lastName = signupUserDto.lastName;
        user.businessName = signupUserDto.businessName;
        user.avatar = "";
        user.address = "";
        user.twitter = "";
        user.facebook = "";
        await user.save();
        let ret = {
            subdomain: (0, utils_2.makeSubdomain)(signupUserDto.businessName),
            message: 'Successfully registered',
        };
        return ret;
    },
    async updateFacebookFeature(userData, enabled) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        user.isFacebookEnabled = enabled;
        await user.save();
        return user;
    },
    async updateHDFeature(userData, enabled) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        user.isHDEnabled = enabled;
        await user.save();
        return user;
    },
    async updateEmailFeature(userData, enabled) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        user.isEmailEnabled = enabled;
        await user.save();
        return user;
    },
    async updateLivechatFeature(userData, enabled) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        user.isLivechatEnabled = enabled;
        await user.save();
        return user;
    },
    async updateCallFeature(userData, enabled) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        user.isCallEnabled = enabled;
        await user.save();
        return user;
    },
    async getProfile(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        return user;
    },
    async integrateHD(userData, hdApiKey) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        user.hdApiKey = hdApiKey;
        await user.save();
        await customer_repository_1.CustomerRepository.importFromHD(userData);
        await customer_repository_1.CustomerRepository.importTransactionsFromHD(userData);
    },
    async integrateEmail(userData, emailIntegrationDto, emailService) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        const existingUser = await user_entity_1.default.findOne({
            where: {
                businessEmail: emailIntegrationDto.email,
            },
        });
        if (existingUser && existingUser.id != user.id) {
            throw new common_1.HttpException(`Already existing user with ${emailIntegrationDto.email}`, 400);
        }
        user.businessEmail = emailIntegrationDto.email;
        user.appPassword = emailIntegrationDto.password;
        if (user.businessEmail) {
            (0, imap_1.setupMailbox)(user.businessEmail, user.appPassword, emailService.receiveEmail.bind(emailService));
        }
        await user.save();
        return user;
    },
    async getAdminUsers() {
        const users = await user_entity_1.default.createQueryBuilder('user')
            .leftJoinAndSelect('user.subUsers', 'subUsers')
            .leftJoinAndSelect('user.admin', 'admin')
            .where('admin.id IS NULL')
            .getMany();
        return users;
    },
    async updatePassword(userData, updatePasswordDto) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 500);
        }
        const validPassword = await bcrypt.compare(updatePasswordDto.password, user.password);
        if (!validPassword) {
            throw new common_1.HttpException('Invalid Password', 500);
        }
        if (updatePasswordDto.newPassword != updatePasswordDto.confirmPassword) {
            throw new common_1.HttpException('Please check confirmation password', 500);
        }
        if (!updatePasswordDto.newPassword) {
            throw new common_1.HttpException('Please check confirmation password', 500);
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(updatePasswordDto.newPassword, salt);
        await user.save();
        return exports.AuthRepository.updatePassword(userData, updatePasswordDto);
    },
    async updateAvatar(userData, avatar) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 500);
        }
        user.avatar = avatar;
        await user.save();
        return user;
    },
    async buyPhoneNumber(userData, areaCode) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 500);
        }
        if (user.phoneNumber) {
            throw new common_1.HttpException('Already have a phone number', 500);
        }
        const phoneNumbers = await Client.availablePhoneNumbers('US').local.list({ limit: 20, areaCode: parseInt(areaCode) });
        if (!phoneNumbers.length) {
            throw new common_1.HttpException('No available twilio phone numbers', 500);
        }
        const phoneNumber = phoneNumbers[0].phoneNumber;
        const resp = await Client.incomingPhoneNumbers.create({ phoneNumber: phoneNumber });
        console.log(resp);
        const phone = await Client.incomingPhoneNumbers(resp.sid)
            .update({
            smsUrl: `${process.env.APP_URL}/sms/receive`,
            smsFallbackUrl: `${process.env.APP_URL}/sms/receive`,
            voiceApplicationSid: 'APfe698af932ffc70882e09a43687c2cc6',
        });
        user.phoneNumber = phone.phoneNumber;
        await user.save();
        return user;
    },
    async portPhoneNumber(userData, phoneNumber) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 500);
        }
        if (user.phoneNumber) {
            throw new common_1.HttpException('Already have a phone number', 500);
        }
        const portOrder = new port_order_entity_1.default();
        portOrder.number = phoneNumber;
        portOrder.user = user;
        await portOrder.save();
        return 'port order requested';
    },
    async getLiveChatScript(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 500);
        }
        const scriptId = parseInt(process.env.BASE_communicate_USER_ID) + user.id;
        return {
            url: `<script async src="https://cdn.jsdelivr.net/gh/jupiter211developer/widgetloader/dist/loader.min.js" data-userid="${scriptId}"></script>`
        };
    },
    async getAnalytics(userData) {
        const userObj = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!userObj) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 500);
        }
        const user = userObj.admin || userObj;
        const customers = await customer_entity_1.default.find({
            where: {
                user: {
                    id: user.id,
                },
            },
        });
        let resolutionTime = 0;
        if (customers.length) {
            const count = customers.reduce((count, customer) => count + (customer.resolutionTime ? 1 : 0), 0);
            if (count) {
                resolutionTime = Math.floor(customers.reduce((sum, customer) => sum + customer.resolutionTime, 0) / customers.length);
            }
        }
        const missedCalls = await voice_history_entity_1.default.createQueryBuilder('voice')
            .leftJoinAndSelect('voice.customer', 'customer')
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .andWhere(`voice.dialCallStatus = 'no-answer'`)
            .andWhere('voice.type = 1')
            .getCount();
        const responseTime = await customer_repository_1.CustomerRepository.getResponseTime(userData);
        return {
            responseTime,
            resolutionTime,
            missedCalls,
        };
    },
    async getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId) {
        return await customer_repository_1.CustomerRepository.getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId);
    },
    async createSubadmin(userData, createSubuserDto) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        const existingUser = await user_entity_1.default.findOne({
            where: {
                email: createSubuserDto.email,
            },
        });
        if (existingUser) {
            throw new common_1.HttpException(`The user with ${createSubuserDto.email} is already existing`, 400);
        }
        const newUser = new user_entity_1.default();
        newUser.email = createSubuserDto.email;
        newUser.firstName = createSubuserDto.firstName;
        newUser.lastName = createSubuserDto.lastName;
        newUser.phoneNumber = createSubuserDto.phoneNumber;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(createSubuserDto.password, salt);
        newUser.admin = user;
        await newUser.save();
        return newUser;
    },
    async updateSLAEmail(userData, slaEmail) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        user.slaEmail = slaEmail;
        await user.save();
        return user;
    },
    async updateSLAMessenger(userData, slaMessenger) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        user.slaMessenger = slaMessenger;
        await user.save();
        return user;
    },
    async updateSLACall(userData, slaCall) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        user.slaCall = slaCall;
        await user.save();
        return user;
    },
    async updateSLALivechat(userData, slaLivechat) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        user.slaLivechat = slaLivechat;
        await user.save();
        return user;
    },
    async getSubadmins(userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        const users = await user_entity_1.default.find({
            where: {
                admin: {
                    id: user.id,
                },
            },
        });
        return users;
    },
    async getSubadminById(userData, id) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        const subadmin = await user_entity_1.default.findOne({
            where: {
                id,
            },
        });
        return subadmin;
    },
    async updateSubadmin(userData, updateSubuserDto) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        const updatedUser = await user_entity_1.default.findOne({
            where: {
                id: updateSubuserDto.id,
            },
        });
        if (!updatedUser) {
            throw new common_1.HttpException(`The user with ${updateSubuserDto.id} is not existing`, 400);
        }
        updatedUser.email = updatedUser.email;
        updatedUser.firstName = updatedUser.firstName;
        updatedUser.lastName = updatedUser.lastName;
        updatedUser.phoneNumber = updatedUser.phoneNumber;
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
        updatedUser.admin = user;
        await updatedUser.save();
        return updatedUser;
    },
    async deleteSubadminById(userData, id) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
            relations: ['admin'],
        });
        if (!user) {
            throw new common_1.HttpException(`Not existing user with ${userData.id}`, 400);
        }
        if (user.admin) {
            throw new common_1.HttpException(`This user is not a admin`, 400);
        }
        const subadmin = await user_entity_1.default.findOne({
            where: {
                id,
            },
        });
        if (subadmin) {
            await user_entity_1.default.remove(subadmin);
        }
        return 'removed';
    },
});
//# sourceMappingURL=auth.repository.js.map
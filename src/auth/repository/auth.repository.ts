import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from "src/data-source";
import User from "src/entity/user.entity";
import { SignupUserDto } from "../dto/signup-user.dto";
import { LoginUserDto } from '../dto/login-user.dto';
import { jwt } from 'src/utils/utils';
import { CustomerRepository } from 'src/customer/repository/customer.repository';
import { setupMailbox } from 'src/utils/imap';
import { EmailService } from 'src/twilio/email/email.service';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { EmailIntegrationDto } from '../dto/email-integration.dto';
import * as twilio from "twilio";
import PortOrder from 'src/entity/port-order.entity';
import SMSHistory from 'src/entity/sms-history.entity';
import Customer from 'src/entity/customer.entity';
import VoiceHistory from 'src/entity/voice-history.entity';
import { CreateSubuserDto } from '../dto/create-subuser.dto';
import { UpdateSubuserDto } from '../dto/update-subuser.dto';

import { makeSubdomain } from 'src/utils/utils';

const Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const AuthRepository = AppDataSource.getRepository(User).extend({
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await User.findOne({
      where: {
        email: loginUserDto.email,
      },
    });
    console.log(loginUserDto);
    if (!user) {
      throw new HttpException('Unregistered User', 400);
    }

    const validPassword = await bcrypt.compare(loginUserDto.password, user.password);

    if (!validPassword) {
      throw new HttpException('Invalid Password', 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload);
    user.loginToken = token;
    await user.save();
    return token;
  },

  async signup(signupUserDto: SignupUserDto): Promise<any> {
    const oldUser = await User.findOne({
      where: [
        { email: signupUserDto.email },
        { phoneNumber: signupUserDto.phoneNumber },
      ],
    });
    if (oldUser) {
      throw new HttpException('Already registered user', 400);
    }

    const user = new User();
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
      subdomain: makeSubdomain(signupUserDto.businessName),
      message: 'Successfully registered',
    }
    return ret;
  },

  async updateFacebookFeature(userData: any, enabled: boolean) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    user.isFacebookEnabled = enabled;
    await user.save();
    return user;
  },

  async updateHDFeature(userData: any, enabled: boolean) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    user.isHDEnabled = enabled;
    await user.save();
    return user;
  },

  async updateEmailFeature(userData: any, enabled: boolean) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    user.isEmailEnabled = enabled;
    await user.save();
    return user;
  },

  async updateLivechatFeature(userData: any, enabled: boolean) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    user.isLivechatEnabled = enabled;
    await user.save();
    return user;
  },

  async updateCallFeature(userData: any, enabled: boolean) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    user.isCallEnabled = enabled;
    await user.save();
    return user;
  },

  async getProfile(userData: any) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    return user;
  },

  async integrateHD(userData: any, hdApiKey: string) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    user.hdApiKey = hdApiKey;
    await user.save();

    await CustomerRepository.importFromHD(userData);
    await CustomerRepository.importTransactionsFromHD(userData);
  },

  async integrateEmail(userData: any, emailIntegrationDto: EmailIntegrationDto, emailService: EmailService) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }

    const existingUser = await User.findOne({
      where: {
        businessEmail: emailIntegrationDto.email,
      },
    });
    if (existingUser && existingUser.id != user.id) {
      throw new HttpException(`Already existing user with ${emailIntegrationDto.email}`, 400);
    }

    user.businessEmail = emailIntegrationDto.email;
    user.appPassword = emailIntegrationDto.password;

    if (user.businessEmail) {
      setupMailbox(user.businessEmail, user.appPassword, emailService.receiveEmail.bind(emailService));
    }
    await user.save();

    return user;
  },

  async getAdminUsers(): Promise<User[]> {
    const users = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.subUsers', 'subUsers')
      .leftJoinAndSelect('user.admin', 'admin')
      .where('admin.id IS NULL')
      .getMany();
    return users;
  },

  async updatePassword(userData: any, updatePasswordDto: UpdatePasswordDto) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 500);
    }

    const validPassword = await bcrypt.compare(updatePasswordDto.password, user.password);

    if (!validPassword) {
      throw new HttpException('Invalid Password', 500);
    }

    if (updatePasswordDto.newPassword != updatePasswordDto.confirmPassword) {
      throw new HttpException('Please check confirmation password', 500);
    }

    if (!updatePasswordDto.newPassword) {
      throw new HttpException('Please check confirmation password', 500);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(updatePasswordDto.newPassword, salt);
    await user.save();

    return AuthRepository.updatePassword(userData, updatePasswordDto);
  },

  async updateAvatar(userData: any, avatar: string): Promise<User> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 500);
    }
    
    user.avatar = avatar;
    await user.save();

    return user;
  },

  async buyPhoneNumber(userData: any, areaCode: string): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 500);
    }

    if (user.phoneNumber) {
      throw new HttpException('Already have a phone number', 500);
    }

    const phoneNumbers = await Client.availablePhoneNumbers('US').local.list({ limit: 20, areaCode: parseInt(areaCode) });
    if (!phoneNumbers.length) {
      throw new HttpException('No available twilio phone numbers', 500);
    }
    const phoneNumber = phoneNumbers[0].phoneNumber;
    const resp = await Client.incomingPhoneNumbers.create({ phoneNumber: phoneNumber });
    console.log(resp);
    // return resp;

    // const phoneNumbers = await Client.incomingPhoneNumbers.list();
    // console.log(phoneNumbers);
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

  async portPhoneNumber(userData: any, phoneNumber: string): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 500);
    }

    if (user.phoneNumber) {
      throw new HttpException('Already have a phone number', 500);
    }

    const portOrder = new PortOrder();
    portOrder.number = phoneNumber;
    portOrder.user = user;
    await portOrder.save();

    return 'port order requested';
  },

  async getLiveChatScript(userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 500);
    }

    const scriptId = parseInt(process.env.BASE_communicate_USER_ID) + user.id;
    return {
      url: `<script async src="https://cdn.jsdelivr.net/gh/jupiter211developer/widgetloader/dist/loader.min.js" data-userid="${scriptId}"></script>`
    };
  },

  async getAnalytics(userData: any): Promise<any> {
    const userObj = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!userObj) {
      throw new HttpException(`Not existing user with ${userData.id}`, 500);
    }

    const user = userObj.admin || userObj;

    // const smsCount = await SMSHistory.createQueryBuilder('sms')
    //   .leftJoinAndSelect('sms.customer', 'customer')
    //   .leftJoinAndSelect('customer.user', 'user')
    //   .where('user.adminId IS NULL')
    //   .andWhere('sms.type = 1')
    //   .getCount();
    // console.log(smsCount);

    // Resolution Time
    const customers = await Customer.find({
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

    // Missed Calls
    const missedCalls = await VoiceHistory.createQueryBuilder('voice')
      .leftJoinAndSelect('voice.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere(`voice.dialCallStatus = 'no-answer'`)
      .andWhere('voice.type = 1')
      .getCount();

    // Response Time
    const responseTime = await CustomerRepository.getResponseTime(userData);

    return {
      responseTime,
      resolutionTime,
      missedCalls,
    };
  },

  // async getIncomingMessages(userData: any, duration: string) {
  //   return await CustomerRepository.getIncomingMessages(userData, duration);
  // },

  async getIncomingMessagesForRange(userData: any, startDate: string, endDate: string, duration: string, agentId: number) {
    return await CustomerRepository.getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId);
  },
  
  async createSubadmin(userData: any, createSubuserDto: CreateSubuserDto) {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }

    const existingUser = await User.findOne({
      where: {
        email: createSubuserDto.email,
      },
    });

    if (existingUser) {
      throw new HttpException(`The user with ${createSubuserDto.email} is already existing`, 400);
    }

    const newUser = new User();
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

  async updateSLAEmail(userData: any, slaEmail: number): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }

    user.slaEmail = slaEmail;
    await user.save();

    return user;
  },

  async updateSLAMessenger(userData: any, slaMessenger: number): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }

    user.slaMessenger = slaMessenger;
    await user.save();
    
    return user;
  },

  async updateSLACall(userData: any, slaCall: number): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }

    user.slaCall = slaCall;
    await user.save();
    
    return user;
  },

  async updateSLALivechat(userData: any, slaLivechat: number): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }

    user.slaLivechat = slaLivechat;
    await user.save();
    
    return user;
  },

  async getSubadmins(userData: any): Promise<User[]> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }
    const users = await User.find({
      where: {
        admin: {
          id: user.id,
        },
      },
    });
    return users;
  },

  async getSubadminById(userData: any, id: number): Promise<User> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }
    const subadmin = await User.findOne({
      where: {
        id,
      },
    });
    return subadmin;
  },

  async updateSubadmin(userData: any, updateSubuserDto: UpdateSubuserDto): Promise<User> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }

    const updatedUser = await User.findOne({
      where: {
        id: updateSubuserDto.id,
      },
    });

    if (!updatedUser) {
      throw new HttpException(`The user with ${updateSubuserDto.id} is not existing`, 400);
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

  async deleteSubadminById(userData: any, id: number): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
      relations: ['admin'],
    });

    if (!user) {
      throw new HttpException(`Not existing user with ${userData.id}`, 400);
    }
    if (user.admin) {
      throw new HttpException(`This user is not a admin`, 400);
    }
    const subadmin = await User.findOne({
      where: {
        id,
      },
    });
    if (subadmin) {
      await User.remove(subadmin);
    }
    return 'removed';
  },
})
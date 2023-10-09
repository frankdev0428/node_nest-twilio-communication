import { HttpException } from "@nestjs/common";
import { CustomerRepository } from "src/customer/repository/customer.repository";
import { AppDataSource } from "src/data-source";
import Customer from "src/entity/customer.entity";
import User from "src/entity/user.entity";
import WebChatHistory from "src/entity/web-chat-history.entity";
import { Brackets, Like } from "typeorm";
import { CreateCustomerFromLiveChatDto } from "../dto/create-customer.dto";
import { CreateWebchatDto } from "../dto/create-webchat.dto";
import { SearchCustomerDto } from "../dto/search-customer.dto";

export const WebchatRepository = AppDataSource.getRepository(WebChatHistory).extend({
  async getWebchat(userId: number, customerId: number): Promise<WebChatHistory[]> {
    if (!userId || !customerId) {
      throw new HttpException('Invalid parameters', 500);
    }

    const user = await User.findOne({
      where: {
        id: userId - parseInt(process.env.BASE_communicate_USER_ID),
      },
    });
    if (!user) {
      throw new HttpException(`Not found a user with ${userId}`, 500);
    }

    const customer = await Customer.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere(new Brackets(qb => {
        qb.where('customer.id = :customerId', { customerId })
          .orWhere('customer.mergedCustomers LIKE :str', { str: `(${customerId})` })
      }))
      .getOne();

    if (!customer) {
      throw new HttpException(`Not found a customer with ${customerId}`, 500);
    }

    const history = await WebChatHistory.find({
      where: {
        customer: {
          id: customer.id,
        },
      },
    });
    return history;
  },

  async receiveWebchat(createWebchatDto: CreateWebchatDto): Promise<any> {
    let customer = null;

    console.log('-----------------receiveWebchat------------------');
    console.log(createWebchatDto);
    if (createWebchatDto.customerId) {
      customer = await Customer.findOne({
        where: [
          { id: createWebchatDto.customerId },
          { mergedCustomers: Like(`(${createWebchatDto.customerId})`) },
        ],
        relations: ['user'],
      });
    }
    
    if (!customer) {
      // const curIndex = await CustomerRepository.getMaxId();
      customer = new Customer();

      customer.firstName = 'First';
      customer.lastName = 'Last';
      customer.street = '';
      customer.city = 'Location';
      customer.zipCode = '';
      customer.email = 'Email';
      customer.number = 'Phone';
      customer.status = 'New';
      customer.priority = 'Medium';
      customer.user = await User.findOne({
        where: {
          id: parseInt(createWebchatDto.userId) - parseInt(process.env.BASE_communicate_USER_ID),
        },
      });
      customer.agentUser = null;
      if (!customer.user.isLivechatEnabled) {
        return;
      }
      await customer.save();
    } else {
      if (!customer.user.isLivechatEnabled) {
        return;
      }
    }

    const webchatHistory = new WebChatHistory();
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

  async sendWebchat(createWebchatDto: CreateWebchatDto): Promise<any> {
    console.log('-----------------sendWebchat------------------');
    console.log(createWebchatDto);
    const customer = await Customer.findOne({
      where: {
        id: createWebchatDto.customerId,
      },
      relations: ['user'],
    });

    if (!customer) {
      throw new HttpException('Unregistered Customer', 500);
    }

    if (!customer.user || !customer.user.isLivechatEnabled) {
      throw new HttpException('Cannot send livechat', 500);
    }

    const webchatHistory = new WebChatHistory();
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

  async getPossibleCustomer(userId: number, searchCustomerDto: SearchCustomerDto) {
    if (!userId) {
      throw new HttpException('Invalid parameters', 500);
    }

    const user = await User.findOne({
      where: {
        id: userId - parseInt(process.env.BASE_communicate_USER_ID),
      },
    });
    if (!user) {
      throw new HttpException(`Not found a user with ${userId}`, 500);
    }

    let customer = await Customer.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere('customer.email = :email', { email: searchCustomerDto.email })
      // .andWhere('customer.firstName = :firstName', { firstName: searchCustomerDto.firstName })
      // .andWhere('customer.lastName = :lastName', { lastName: searchCustomerDto.lastName })
      .getOne();

    if (customer) {
      return customer;
    }

    customer = new Customer();

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

  async createCustomerFromLiveChat(userId: number, createCustomerFromLiveChatDto: CreateCustomerFromLiveChatDto) {
    if (!userId) {
      throw new HttpException('Invalid parameters', 500);
    }

    const user = await User.findOne({
      where: {
        id: userId - parseInt(process.env.BASE_communicate_USER_ID),
      },
    });
    if (!user) {
      throw new HttpException(`Not found a user with ${userId}`, 500);
    }

    const existingCustomer = await Customer.findOne({
      where: {
        email: createCustomerFromLiveChatDto.email,
      },
    });

    if (!existingCustomer) {
      throw new HttpException(`Existing customer with ${createCustomerFromLiveChatDto.email}`, 500);
    }

    const customer = new Customer();

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
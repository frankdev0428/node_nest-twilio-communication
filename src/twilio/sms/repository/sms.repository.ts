import { CustomerRepository } from "src/customer/repository/customer.repository";
import { AppDataSource } from "src/data-source";
import Customer from "src/entity/customer.entity";
import MessageMedia from "src/entity/message-media.entity";
import SMSHistory from "src/entity/sms-history.entity";
import User from "src/entity/user.entity";
import { MessagingWebhookBody } from "src/types/request";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export const SMSRepository = AppDataSource.getRepository(SMSHistory).extend({
  async getSMSHistoryList(customerId: number): Promise<SMSHistory[]> {
    const customer = await Customer.findOne({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return [];
    }
    
    const smsHistories = await SMSHistory.find({
      where: {
        customer: {
          id: customer.id,
        },
      },
    });

    return smsHistories;
  },

  async createSMSHistory(res: MessageInstance, userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      return null;
    }

    let customer = await Customer.findOne({
      where: {
        number: res.to,
        user: {
          id: user.id,
        },
      },
    });

    if (!customer) {
      // const curIndex = await CustomerRepository.getMaxId();
      customer = new Customer();

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

    const smsHistory = new SMSHistory();
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
  
  async saveReceivedSMS(body: MessagingWebhookBody): Promise<any> {
    const user = await User.findOne({
      where: {
        phoneNumber: body.To,
      },
    });
    if (!user) {
      console.log('=======> Unregistered communicate number', body.To);
      return null;
    }

    let customer = await Customer.findOne({
      where: {
        number: body.From,
        user: {
          id: user.id,
        },
      },
    });

    if (!customer) {
      // const curIndex = await CustomerRepository.getMaxId();
      customer = new Customer();

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

    const smsHistory = new SMSHistory();
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
      const messageMedia = new MessageMedia();
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
})
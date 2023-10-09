import { CustomerRepository } from "src/customer/repository/customer.repository";
import { AppDataSource } from "src/data-source";
import Customer from "src/entity/customer.entity";
import FacebookHistory from "src/entity/facebook-history.entity";
import User from "src/entity/user.entity";
import * as twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { CreateFacebookDto } from "../dto/create-facebook.dto";
import { SendFacebookDto } from "../dto/send-facebook.dto";

// const AccessToken = twilio.jwt.AccessToken;
// const VoiceGrant = AccessToken.VoiceGrant;
// const VoiceResponse = twilio.twiml.VoiceResponse;
const Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const FacebookRepository = AppDataSource.getRepository(FacebookHistory).extend({
  async receiveFacebookMessage(body: CreateFacebookDto): Promise<any> {
    console.log('----------------------------receiveFacebookMessage------------------------');
    console.log(body);
    const user = await User.findOne({
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

    let customer = await Customer.findOne({
      where: {
        facebookMessageSid: body.From,
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
      customer.number = 'Phone';
      customer.status = 'New';
      customer.priority = 'Medium';
      customer.facebookMessageSid = body.From;
      customer.agentUser = null;
      customer.user = user;
      await customer.save();
    }

    const facebookHistory = new FacebookHistory();
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
  
  async sendMessage(sendFacebookDto: SendFacebookDto, userData: any): Promise<any> {
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
        facebookMessageSid: sendFacebookDto.to,
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

    const res: MessageInstance = await Client.messages
      .create({
        body: sendFacebookDto.content,
        from: user.facebookMessageSid,
        to: sendFacebookDto.to,
      });

    const facebookHistory = new FacebookHistory();
    facebookHistory.type = 0;
    facebookHistory.body = res.body;
    facebookHistory.numSegments = res.numSegments;
    // facebookHistory.direction = res.direction;
    facebookHistory.from = res.from;
    facebookHistory.to = res.to;
    // facebookHistory.dateUpdated = res.dateUpdated;
    // facebookHistory.price = res.price;
    // facebookHistory.errorMessage = res.errorMessage;
    // facebookHistory.uri = res.uri;
    facebookHistory.accountSid = res.accountSid;
    facebookHistory.numMedia = res.numMedia;
    facebookHistory.messageSid = res.sid;
    // facebookHistory.status = res.status;
    // facebookHistory.messagingServiceSid = res.messagingServiceSid;
    // facebookHistory.sid = res.sid;
    // facebookHistory.dateSent = res.dateSent;
    // facebookHistory.dateCreated = res.dateCreated;
    // facebookHistory.errorCode = res.errorCode;
    // facebookHistory.priceUnit = res.priceUnit;
    facebookHistory.apiVersion = res.apiVersion;
    // facebookHistory.subresourceUris = JSON.stringify(res.subresourceUris);
    facebookHistory.customer = customer;
    await facebookHistory.save();

    return facebookHistory;
  },
});
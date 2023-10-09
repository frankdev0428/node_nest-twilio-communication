import { Injectable } from '@nestjs/common';
import { SendSMSDto } from './dto/send-sms.dto';
import * as Twilio from 'twilio';
import { SMSRepository } from './repository/sms.repository';
import SMSHistory from 'src/entity/sms-history.entity';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import { MessagingWebhookBody } from 'src/types/request';
import User from 'src/entity/user.entity';

@Injectable()
export class SMSService {
  async sendSMS(content: SendSMSDto, userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      return null;
    }
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = Twilio(accountSid, authToken);

    const res: MessageInstance = await client.messages
      .create({
        body: content.body,
        from: user.phoneNumber,
        to: content.to,
        mediaUrl: content.mediaUrl,
      });
    console.log('sendSMS', res);

    const smsHistory = await SMSRepository.createSMSHistory(res, userData);
    return smsHistory;
  }

  async getSMS(customerId: number): Promise<SMSHistory[]> {
    return SMSRepository.getSMSHistoryList(customerId);
  }

  async saveReceivedSMS(body: MessagingWebhookBody): Promise<any> {
    return SMSRepository.saveReceivedSMS(body);
  }
}

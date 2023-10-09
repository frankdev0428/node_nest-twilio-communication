import { HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Profile } from 'src/utils/facebook/Profile';
import { WEBHOOK_URL } from 'src/utils/utils';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { SendFacebookDto } from './dto/send-facebook.dto';
import { FacebookRepository } from './repository/facebook.repository';

@Injectable()
export class FacebookService {
  async getFacebookWebhook(req: Request): Promise<any> {
    console.log('--------------------------getFacebookWebhook-------------------------');
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === "subscribe" && token === process.env.FACEBOOK_VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log("--------------------------WEBHOOK_VERIFIED-------------------------");
        return challenge;
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        throw new HttpException('Forbidden', 403);
      }
    }
  }

  async receiveFacebookMessage(createFacebookDto: CreateFacebookDto): Promise<any> {
    return FacebookRepository.receiveFacebookMessage(createFacebookDto);
  }

  async setFacebookWebhook(createFacebookDto: CreateFacebookDto): Promise<any> {
    console.log(createFacebookDto);
  }

  async sendMessage(sendFacebookDto: SendFacebookDto, userData: any): Promise<any> {
    return FacebookRepository.sendMessage(sendFacebookDto, userData);
  }

  async receiveMessage(content, body): Promise<any> {
    //
  }
}

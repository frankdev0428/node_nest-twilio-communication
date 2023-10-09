import { Injectable } from '@nestjs/common';
import { WebchatRepository } from './repository/webchat.repository';
import { NotificationGateway } from '../notifications/notification.gateway';
import { CreateWebchatDto } from './dto/create-webchat.dto';
import { WebchatNotificationGateway } from '../notifications/webchat-notification.gateway';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { CreateCustomerFromLiveChatDto } from './dto/create-customer.dto';

@Injectable()
export class WebchatService {
  constructor(
    private readonly notificationGateway: NotificationGateway,
    private readonly webchatNotificationGateway: WebchatNotificationGateway,
  ) {
    // setupMailbox("communications@communicate.io", "uxrauqpmtvnfmelz", this.receiveEmail.bind(this));
  }

  getWebchat(userId: number, customerId: number) {
    return WebchatRepository.getWebchat(userId, customerId);
  }

  async receiveWebchat(createWebchatDto: CreateWebchatDto) {
    const { webchatHistory, userId } = await WebchatRepository.receiveWebchat(createWebchatDto);

    if (userId) {
      this.notificationGateway.emitNewWebchat({ webchatHistory, userId });
    }
    return webchatHistory;
  }

  async sendWebchat(createWebchatDto: CreateWebchatDto) {
    const { webchatHistory, customerId } = await WebchatRepository.sendWebchat(createWebchatDto);

    if (customerId) {
      this.webchatNotificationGateway.emitNewWebchat({ webchatHistory, customerId });
    }
    return webchatHistory;
  }

  getPossibleCustomer(userId: number, searchCustomerDto: SearchCustomerDto) {
    return WebchatRepository.getPossibleCustomer(userId, searchCustomerDto);
  }

  // createCustomerFromLiveChat(userId: number, createCustomerFromLiveChatDto: CreateCustomerFromLiveChatDto) {
  //   return WebchatRepository.createCustomerFromLiveChat(userId, createCustomerFromLiveChatDto);
  // }
}

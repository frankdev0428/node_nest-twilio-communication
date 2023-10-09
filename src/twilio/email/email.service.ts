import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailRepository } from './repository/email.repository';
import { setupMailbox } from 'src/utils/imap';
import { NotificationGateway } from '../notifications/notification.gateway';
import { CreateEmailSubjectDto } from './dto/create-email-subject.dto';
import { AuthRepository } from 'src/auth/repository/auth.repository';

@Injectable()
export class EmailService {
  constructor(private readonly notificationGateway: NotificationGateway) {
    // setupMailbox("communications@communicate.io", "uxrauqpmtvnfmelz", this.receiveEmail.bind(this));
  }

  onModuleInit() {
    this.setupMailbox();
  }

  async setupMailbox() {
    const users = await AuthRepository.getAdminUsers();

    for (const user of users) {
      if (user.businessEmail) {
        setupMailbox(user.businessEmail, user.appPassword, this.receiveEmail.bind(this));
      }
    }
  }

  sendEmailWithNewSubject(createEmailDto: CreateEmailSubjectDto, user: any) {
    return EmailRepository.sendEmailWithNewSubject(createEmailDto, user);
  }

  replyEmail(createEmailDto: CreateEmailSubjectDto, user: any) {
    return EmailRepository.replyEmail(createEmailDto, user);
  }

  async receiveEmail(from, to, subject, text, content, messageId) {
    console.log("---------------receiveEmail---------------", from, to, subject, messageId);
    console.log(content);
    const { emailHistory, userId } = await EmailRepository.receiveEmail(from, to, subject, text, content, messageId);
    if (userId) {
      this.notificationGateway.emitNewEmail({ emailHistory, userId })
    }
  }

  // findAll(customerId: number) {
  //   return EmailRepository.findEmailHistories(customerId);
  // }

  // findOne(id: number) {
  //   return EmailRepository.findEmailHistory(id);
  // }

  // update(id: number, updateHistoryDto: UpdateEmailHistoryDto) {
  //   return EmailRepository.updateHistory(id, updateHistoryDto);
  // }

  // remove(id: number) {
  //   return EmailRepository.removeHistory(id);
  // }
}

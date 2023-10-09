import { NotificationGateway } from '../notifications/notification.gateway';
import { CreateEmailSubjectDto } from './dto/create-email-subject.dto';
export declare class EmailService {
    private readonly notificationGateway;
    constructor(notificationGateway: NotificationGateway);
    onModuleInit(): void;
    setupMailbox(): Promise<void>;
    sendEmailWithNewSubject(createEmailDto: CreateEmailSubjectDto, user: any): Promise<any>;
    replyEmail(createEmailDto: CreateEmailSubjectDto, user: any): Promise<any>;
    receiveEmail(from: any, to: any, subject: any, text: any, content: any, messageId: any): Promise<void>;
}

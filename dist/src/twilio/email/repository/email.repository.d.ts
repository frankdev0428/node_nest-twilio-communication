import EmailHistory from 'src/entity/email-history.entity';
import { CreateEmailSubjectDto } from "../dto/create-email-subject.dto";
export declare const EmailRepository: import("typeorm").Repository<EmailHistory> & {
    sendEmailWithNewSubject(createEmailDto: CreateEmailSubjectDto, userData: any): Promise<any>;
    replyEmail(createEmailDto: CreateEmailSubjectDto, userData: any): Promise<any>;
    receiveEmail(from: any, to: any, subject: any, text: any, content: any, messageId: any): Promise<{
        emailHistory: EmailHistory;
        userId: number;
    }>;
};

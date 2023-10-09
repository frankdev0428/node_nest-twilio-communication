import { EmailService } from './email.service';
import { CreateEmailSubjectDto } from './dto/create-email-subject.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    create(createEmailDto: CreateEmailSubjectDto, req: any): Promise<any>;
    replyEmail(createEmailDto: CreateEmailSubjectDto, req: any): Promise<any>;
    startEmailServer(): Promise<void>;
}

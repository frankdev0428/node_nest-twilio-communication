import { HttpException } from "@nestjs/common";
import { AppDataSource } from "src/data-source";
import EmailHistory from 'src/entity/email-history.entity';
import User from "src/entity/user.entity";
import { CreateEmailDto } from "../dto/create-email.dto";
import * as nodemailer from "nodemailer";
import Customer from "src/entity/customer.entity";
import { CustomerRepository } from "src/customer/repository/customer.repository";
import { CreateEmailSubjectDto } from "../dto/create-email-subject.dto";

export const EmailRepository = AppDataSource.getRepository(EmailHistory).extend({
  async sendEmailWithNewSubject(createEmailDto: CreateEmailSubjectDto, userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user || !user.isEmailEnabled || !user.businessEmail) {
      throw new HttpException('Unregistered User', 500);
    }
    const customer = await Customer.findOne({
      where: {
        id: createEmailDto.customerId,
      },
    });
    if (!customer) {
      throw new HttpException('Unregistered Customer', 500);
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      type: "SMTP",
      port: 587,
      secure: false,
      auth: {
        user: user.businessEmail,
        pass: user.appPassword,
      }
    });

    const mailOption = {
      from: user.businessEmail,  //here write your own gmail
      to: createEmailDto.email,
      subject: createEmailDto.subject,
      text: createEmailDto.content,
      // inReplyTo: '<CAAswz5bAraLOnYCNq7a2NMvYQjAkvXARm3OGEBwromLd_T2hpA@mail.gmail.com>',
      // references: ['<CAAswz5bAraLOnYCNq7a2NMvYQjAkvXARm3OGEBwromLd_T2hpA@mail.gmail.com>']
    };
    try {
      const resp = await transport.sendMail(mailOption);
      // console.log(resp);
      const emailHistory = new EmailHistory();
      emailHistory.type = 0;
      emailHistory.fromEmail = user.businessEmail;
      emailHistory.toEmail = createEmailDto.email;
      emailHistory.subject = mailOption.subject;
      emailHistory.content = createEmailDto.content;
      emailHistory.customer = customer;
      await emailHistory.save();
      return emailHistory;
    } catch (e) {
      throw new HttpException('Failed to send email: ' + e.message, 500);
    }
  },

  async replyEmail(createEmailDto: CreateEmailSubjectDto, userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    if (!user || !user.isEmailEnabled || !user.businessEmail) {
      throw new HttpException('Unregistered User', 500);
    }
    const customer = await Customer.findOne({
      where: {
        id: createEmailDto.customerId,
      },
      relations: ['emails'],
    });
    if (!customer) {
      throw new HttpException('Unregistered Customer', 500);
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      type: "SMTP",
      port: 465,
      secure: true,
      auth: {
        user: user.businessEmail,
        pass: user.appPassword,
      }
    });

    customer.emails.sort((a, b) => {
      if (b.createdDate && a.createdDate) {
        return b.createdDate.getTime() - a.createdDate.getTime();
      } else if (a.createdDate) {
        return -1;
      } else if (b.createdDate) {
        return 1;
      }
      return 0;
    });

    const latestReceivedEmail = customer.emails.find((email) => email.id);

    let subject = createEmailDto.subject;
    let messageId = "";

    // console.log(subject, latestReceivedEmail && latestReceivedEmail.subject);
    console.log('latestReceivedEmail', latestReceivedEmail);
    if (latestReceivedEmail && subject == latestReceivedEmail.subject) {
      messageId = latestReceivedEmail.messageId;
      // subject = subject;
    }

    const mailOption = {
      from: user.businessEmail,  //here write your own gmail
      to: createEmailDto.email,
      subject,
      // messageId,
      html: createEmailDto.content,
      // replyTo: createEmailDto.email,
      inReplyTo: messageId,
      references: [messageId],
      attachments: createEmailDto.attachments || [],
    };
    console.log(mailOption);
    try {
      const resp = await transport.sendMail(mailOption);
      console.log(resp);
      const emailHistory = new EmailHistory();
      emailHistory.type = 0;
      emailHistory.fromEmail = user.businessEmail;
      emailHistory.toEmail = createEmailDto.email;
      emailHistory.subject = mailOption.subject;
      emailHistory.content = createEmailDto.content;
      emailHistory.customer = customer;
      emailHistory.messageId = resp.messageId;
      await emailHistory.save();
      return emailHistory;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to send email: ' + e.message, 500);
    }
  },

  async receiveEmail(from, to, subject, text, content, messageId) {
    const user = await User.findOne({
      where: {
        businessEmail: to,
      },
    });

    if (!user || !user.isEmailEnabled || !user.businessEmail) {
      return { emailHistory: null, userId: null };
    }

    let customer = await Customer.findOne({
      where: {
        user: {
          id: user.id,
        },
        email: from,
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
      customer.email = from;
      customer.number = 'Phone';
      customer.status = 'New';
      customer.priority = 'Medium';
      customer.agentUser = null;
      customer.user = user;
      await customer.save();
    }
    console.log('------------------------------content---------------------------', content);

    if (content) {
      let pos = content.indexOf('\n--');
      if (pos != -1) {
        content = content.substr(0, pos);
      }
    }

    const existingEmailHistory = await EmailHistory.findOne({
      where: {
        messageId,
      },
    });
    if (existingEmailHistory) {
      return;
    }

    const emailHistory = new EmailHistory();
    emailHistory.type = 1;
    emailHistory.subject = subject;
    emailHistory.fromEmail = from;
    emailHistory.toEmail = to;
    emailHistory.content = content;
    emailHistory.text = text;
    emailHistory.messageId = messageId;
    emailHistory.customer = customer;
    await emailHistory.save();

    if (customer.status == 'Completed') {
      customer.createdDate = new Date();
      customer.status = 'New';
      customer.agentUser = null;
      await customer.save();
    }

    return { emailHistory, userId: user.id };
  },
});
import { ParamsDictionary, Query } from "express-serve-static-core";
import { Socket } from 'socket.io';
import { Request } from "express";
export type MessagingWebhookBody = {
    MessageSid: string;
    Body: string;
    From: string;
    To: string;
    ToCountry: string;
    ToState: string;
    SmsMessageSid: string;
    NumMedia: string;
    ToCity: string;
    FromZip: string;
    SmsSid: string;
    FromState: string;
    SmsStatus: string;
    FromCity: string;
    FromCountry: string;
    MessagingServiceSid: string;
    ToZip: string;
    NumSegments: string;
    ReferralNumMedia: string;
    AccountSid: string;
    ApiVersion: string;
};
export type MessagingRequest = Request<ParamsDictionary, any, MessagingWebhookBody, Query>;
export type SocketMap = {
    [key: string]: Socket[];
};
export type IdsBody = {
    ids: number[];
};

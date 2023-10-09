import { BaseEntity } from "typeorm";
import VoiceHistory from "./voice-history.entity";
export default class RecordHistory extends BaseEntity {
    id: number;
    accountSid: string;
    apiVersion: string;
    callSid: string;
    conferenceSid: string;
    dateCreated: Date;
    dateUpdated: Date;
    startTime: Date;
    duration: string;
    sid: string;
    price: number;
    uri: string;
    encryptionDetails: string;
    priceUnit: string;
    status: string;
    channels: number;
    source: string;
    errorCode: number;
    track: string;
    createdDate: Date;
    updatedDate: Date;
    voiceHistory: VoiceHistory;
}

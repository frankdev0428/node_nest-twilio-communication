import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import VoiceHistory from "./voice-history.entity";

@Entity('record_history')
export default class RecordHistory extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: null })
  accountSid: string;

  @ApiProperty()
  @Column({ default: null })
  apiVersion: string;

  @ApiProperty()
  @Column({ default: null })
  callSid: string;

  @ApiProperty()
  @Column({ default: null })
  conferenceSid: string;

  @ApiProperty()
  @Column({ default: null })
  dateCreated: Date;

  @ApiProperty()
  @Column({ default: null })
  dateUpdated: Date;

  @ApiProperty()
  @Column({ default: null })
  startTime: Date;

  @ApiProperty()
  @Column({ default: null })
  duration: string;

  @ApiProperty()
  @Column({ default: null })
  sid: string;

  @ApiProperty()
  @Column({ default: null })
  price: number;

  @ApiProperty()
  @Column({ default: null })
  uri: string;

  @ApiProperty()
  @Column({ default: null })
  encryptionDetails: string;

  @ApiProperty()
  @Column({ default: null })
  priceUnit: string;

  @ApiProperty()
  @Column({ default: null })
  status: string;

  @ApiProperty()
  @Column({ default: null })
  channels: number;

  @ApiProperty()
  @Column({ default: null })
  source: string;

  @ApiProperty()
  @Column({ default: null })
  errorCode: number;

  @ApiProperty()
  @Column({ default: null })
  track: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @ManyToOne(
    type => VoiceHistory,
    voice => voice.records,
  )
  voiceHistory: VoiceHistory;
}
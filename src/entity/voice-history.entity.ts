import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";
import RecordHistory from "./record-history.entity";

@Entity('voice_history')
export default class VoiceHistory extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // 0: outgoing, 1: incoming
  @ApiProperty()
  @Column()
  type: number;

  @ApiProperty()
  @Column({ default: null })
  accountSid: string;

  @ApiProperty()
  @Column({ default: null })
  apiVersion: string;

  @ApiProperty()
  @Column({ default: null })
  applicationSid: string;

  @ApiProperty()
  @Column({ default: null })
  callSid: string;

  @ApiProperty()
  @Column({ default: null })
  callStatus: string;

  @ApiProperty()
  @Column({ default: null })
  callToken: string;

  @ApiProperty()
  @Column({ default: null })
  called: string;

  @ApiProperty()
  @Column({ default: null })
  calledCity: string;

  @ApiProperty()
  @Column({ default: null })
  calledCountry: string;

  @ApiProperty()
  @Column({ default: null })
  calledState: string;

  @ApiProperty()
  @Column({ default: null })
  calledZip: string;

  @ApiProperty()
  @Column({ default: null })
  caller: string;

  @ApiProperty()
  @Column({ default: null })
  callerCity: string;

  @ApiProperty()
  @Column({ default: null })
  callerCountry: string;

  @ApiProperty()
  @Column({ default: null })
  callerState: string;

  @ApiProperty()
  @Column({ default: null })
  callerZip: string;

  @ApiProperty()
  @Column({ default: null })
  direction: string;

  @ApiProperty()
  @Column({ default: null })
  dialBridged: string;

  @ApiProperty()
  @Column({ default: null })
  dialCallSid: string;

  @ApiProperty()
  @Column({ default: null })
  dialCallStatus: string;

  @ApiProperty()
  @Column({ default: null })
  from: string;

  @ApiProperty()
  @Column({ default: null })
  fromCity: string;

  @ApiProperty()
  @Column({ default: null })
  fromCountry: string;

  @ApiProperty()
  @Column({ default: null })
  fromState: string;

  @ApiProperty()
  @Column({ default: null })
  fromZip: string;

  @ApiProperty()
  @Column({ default: null })
  stirPassportToken: string;

  @ApiProperty()
  @Column({ default: null })
  stirVerstat: string;

  @ApiProperty()
  @Column({ default: null })
  to: string;

  @ApiProperty()
  @Column({ default: null })
  toCity: string;

  @ApiProperty()
  @Column({ default: null })
  toCountry: string;

  @ApiProperty()
  @Column({ default: null })
  toState: string;

  @ApiProperty()
  @Column({ default: null })
  toZip: string;

  @ApiProperty()
  @Column({ default: null })
  timestamp: string;
  
  @ApiProperty()
  @Column({ default: null })
  callbackSource: string;
  
  @ApiProperty()
  @Column({ default: null })
  sequenceNumber: string;
  
  @ApiProperty()
  @Column({ default: null })
  duration: string;
  
  @ApiProperty()
  @Column({ default: null })
  callDuration: string;

  @ApiProperty()
  @Column({ default: null })
  childSids: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @Column()
  customerId: number;

  @ManyToOne(
    type => Customer,
    customer => customer.voices,
  )
  customer: Customer;

	@OneToMany(
		type => RecordHistory,
		record => record.voiceHistory,
	)
	records: RecordHistory[];
}
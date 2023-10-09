import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";
import MessageMedia from "./message-media.entity";

@Entity('sms_history')
export default class SMSHistory extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // 0: sent, 1: received
  @ApiProperty()
  @Column()
  type: number;

  @ApiProperty()
  @Column({ default: null })
  body: string;

  @ApiProperty()
  @Column({ default: null })
  numSegments: string;

  @ApiProperty()
  @Column({ default: null })
  direction: string;

  @ApiProperty()
  @Column({ default: null })
  from: string;

  @ApiProperty()
  @Column({ default: null })
  to: string;

  @ApiProperty()
  @Column({ default: null })
	dateUpdated: Date;

  @ApiProperty()
  @Column({ default: null })
  price: string;

  @ApiProperty()
  @Column({ default: null })
	errorMessage: string;
  
  @ApiProperty()
  @Column({ default: null })
	uri: string;

  @ApiProperty()
  @Column({ default: null })
	accountSid: string;

  @ApiProperty()
  @Column({ default: null })
	numMedia: string;

  @ApiProperty()
  @Column({ default: null })
	status: string;

  @ApiProperty()
  @Column({ default: null })
	messagingServiceSid: string;

  @ApiProperty()
  @Column({ default: null })
	sid: string;

  @ApiProperty()
  @Column({ default: null })
	dateSent: Date;

  @ApiProperty()
  @Column({ default: null })
	dateCreated: Date;

  @ApiProperty()
  @Column({ default: null })
	errorCode: number;

  @ApiProperty()
  @Column({ default: null })
	priceUnit: string;

  @ApiProperty()
  @Column({ default: null })
	apiVersion: string;

  @ApiProperty()
  @Column({ default: null })
	subresourceUris: string;

  @ApiProperty()
  @Column({ default: null })
	toCountry: string;

  @ApiProperty()
  @Column({ default: null })
	toState: string;

  @ApiProperty()
  @Column({ default: null })
	smsMessageSid: string;

  @ApiProperty()
  @Column({ default: null })
	toCity: string;

  @ApiProperty()
  @Column({ default: null })
	fromZip: string;

  @ApiProperty()
  @Column({ default: null })
	smsSid: string;

  @ApiProperty()
  @Column({ default: null })
	fromState: string;

  @ApiProperty()
  @Column({ default: null })
	smsStatus: string;

  @ApiProperty()
  @Column({ default: null })
	fromCity: string;

  @ApiProperty()
  @Column({ default: null })
	fromCountry: string;

  @ApiProperty()
  @Column({ default: null })
	toZip: string;

  @ApiProperty()
  @Column({ default: null })
	referralNumMedia: string;

  @ApiProperty()
  @Column({ default: null })
	messageSid: string;
  
	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @Column()
  customerId: number;

  @ManyToOne(
    type => Customer,
    customer => customer.sms,
  )
  customer: Customer;

  @OneToMany(
    type => MessageMedia,
    media => media.message,
  )
  media: MessageMedia[];
}
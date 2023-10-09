import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import EmailHistory from "./email-history.entity";
import FacebookHistory from "./facebook-history.entity";
import HDOrder from "./hd-order.entity";
import SMSHistory from "./sms-history.entity";
import Transaction from "./transaction.entity";
import User from "./user.entity";
import VoiceHistory from "./voice-history.entity";
import WebChatHistory from "./web-chat-history.entity";

@Entity()
export default class Customer extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ nullable: true })
	firstName: string;

	@ApiProperty()
	@Column({ nullable: true })
	lastName: string;

	@ApiProperty()
	@Column({ nullable: true })
	number: string;

	@ApiProperty()
	@Column({ nullable: true })
	street: string;

	@ApiProperty()
	@Column({ nullable: true })
	city: string;

	@ApiProperty()
	@Column({ nullable: true })
	state: string;

	@ApiProperty()
	@Column({ nullable: true })
	zipCode: string;

	@ApiProperty()
	@Column({ nullable: true })
	email: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	status: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	department: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	priority: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	agent: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	whatsapp: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	instagram: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	messenger: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	telegram: string;
	
	@ApiProperty()
	@Column({ nullable: true })
	wechat: string;

	@ApiProperty()
	@Column({ nullable: true })
	avatar: string;

	@ApiProperty()
	@Column({ nullable: true })
	facebookMessageSid: string;

	@ApiProperty()
	@Column({ nullable: true })
	uid: string;

	@ApiProperty()
	@Column({ nullable: true })
	responseTime: number;

	@ApiProperty()
	@Column({ nullable: true })
	resolutionTime: number;

	@ApiProperty()
	@Column()
	userId: number;

	@ApiProperty()
	@Column()
	agentUserId: number;

	@ApiProperty()
	@Column({ nullable: true })
	bid: string;

	@ApiProperty()
	@Column({ type: 'text', nullable: true })
	mergedCustomers: string;

	@Column({ type: 'datetime', nullable: true })
	completedDate: Date;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	// admin & business
	@ManyToOne(
		type => User,
		user => user.customers,
	)
	user: User;

	// agent
	@ManyToOne(
		type => User,
		user => user.assignedCustomers,
	)
	agentUser: User;

	@OneToMany(
		type => SMSHistory,
		history => history.customer,
	)
	sms: SMSHistory[];

	@OneToMany(
		type => EmailHistory,
		history => history.customer,
	)
	emails: EmailHistory[];

	@OneToMany(
		type => VoiceHistory,
		history => history.customer,
	)
	voices: VoiceHistory[];

	@OneToMany(
		type => FacebookHistory,
		history => history.customer,
	)
	facebook: FacebookHistory[];

	@OneToMany(
		type => WebChatHistory,
		webchat => webchat.customer,
	)
	webchat: WebChatHistory[];

	@OneToMany(
		type => Transaction,
		transaction => transaction.customer,
	)
	transactions: Transaction[];

	@OneToMany(
		type => HDOrder,
		hdOrder => hdOrder.customer,
	)
	hdOrders: HDOrder[];
}
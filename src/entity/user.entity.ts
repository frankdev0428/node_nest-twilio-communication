import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import ChatHistory from "./chat-history.entity";
import Customer from "./customer.entity";
import PortOrder from "./port-order.entity";

@Entity()
export default class User extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ unique: true })
	email: string;

	@ApiProperty()
	@Column({ nullable: true })
	firstName: string;

	@ApiProperty()
	@Column({ nullable: true })
	lastName: string;
	
	@ApiProperty()
	@Column()
	avatar: string;

	@ApiProperty()
	@Column()
	password: string;

	@ApiProperty()
	@Column()
	address: string;

	@ApiProperty()
	@Column()
	twitter: string;

	@ApiProperty()
	@Column()
	facebook: string;

	@ApiProperty()
	@Column()
	phoneNumber: string;

	@ApiProperty()
	@Column({ nullable: true })
	hdApiKey: string;

	@ApiProperty()
	@Column({ default: true })
	isHDEnabled: boolean;

	@ApiProperty()
	@Column({ default: true })
	isFacebookEnabled: boolean;

	@ApiProperty()
	@Column({ default: true })
	isLivechatEnabled: boolean;

	@ApiProperty()
	@Column({ default: true })
	isCallEnabled: boolean;

	@ApiProperty()
	@Column({ default: true })
	businessName: string;

	@ApiProperty()
	@Column({ nullable: true })
	businessEmail: string;

	@ApiProperty()
	@Column({ nullable: true })
	appPassword: string;

	@ApiProperty()
	@Column({ default: true })
	isEmailEnabled: boolean;

	@ApiProperty()
	@Column({ nullable: true })
	facebookMessageSid: string;

	@ApiProperty()
	@Column({ nullable: true })
	loginToken: string;

	@ApiProperty()
	@Column({ nullable: true })
	slaEmail: number;

	@ApiProperty()
	@Column({ nullable: true })
	slaMessenger: number;

	@ApiProperty()
	@Column({ nullable: true })
	slaCall: number;

	@ApiProperty()
	@Column({ nullable: true })
	slaLivechat: number;

	@ApiProperty()
	@Column({ nullable: true })
	countEmail: number;

	@ApiProperty()
	@Column({ nullable: true })
	countMessenger: number;

	@ApiProperty()
	@Column({ nullable: true })
	countCall: number;

	@ApiProperty()
	@Column({ nullable: true })
	countLivechat: number;

  @CreateDateColumn()
	createdDate: Date;

  @UpdateDateColumn()
	updatedDate: Date;

	@ManyToOne(
    type => User,
    user => user.subUsers,
  )
  admin: User;

	@OneToMany(
    type => User,
    user => user.admin,
  )
  subUsers: User[];

	@OneToMany(
    type => Customer,
    customer => customer.user,
  )
  customers: Customer[];

	@OneToMany(
    type => Customer,
    customer => customer.agentUser,
  )
	assignedCustomers: Customer[];
	
	@OneToMany(
    type => ChatHistory,
    chat => chat.fromUser,
  )
  sentMessages: ChatHistory[];

	@OneToMany(
    type => ChatHistory,
    chat => chat.toUser,
  )
	receivedMessages: ChatHistory[];

	@OneToMany(
    type => PortOrder,
    portOrder => portOrder.user,
	)
	portOrders: PortOrder[];
}
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";

@Entity('web_chat_history')
export default class WebChatHistory extends BaseEntity {
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
  @Column({ default: false })
  bRead: boolean;

  @ApiProperty()
  @Column({ type: 'text', default: null })
  attachments: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @Column()
  customerId: number;

  @ManyToOne(
    type => Customer,
    customer => customer.webchat,
  )
  customer: Customer;
}
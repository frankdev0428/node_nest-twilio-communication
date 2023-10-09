import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from "./user.entity";

@Entity('chat_history')
export default class ChatHistory extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // 0: sent, 1: received
  // @ApiProperty()
  // @Column()
  // type: number;

  @ApiProperty()
  @Column({ default: null })
  body: string;

  @ApiProperty()
  @Column({ default: false })
  bRead: boolean;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  // @ApiProperty()
  @ManyToOne(
    type => User,
    user => user.sentMessages,
  )
  fromUser: User;
  
  // @ApiProperty()
  @ManyToOne(
    type => User,
    user => user.receivedMessages,
  )
  toUser: User;
}
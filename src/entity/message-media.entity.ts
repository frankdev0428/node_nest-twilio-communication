import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";
import SMSHistory from "./sms-history.entity";

@Entity('message_media')
export default class MessageMedia extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // 0: sent, 1: received
  @ApiProperty()
  @Column()
  type: number;

  @ApiProperty()
  @Column({ default: null })
  contentType: string;

  @ApiProperty()
  @Column({ default: null })
  url: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @ManyToOne(
    type => SMSHistory,
    message => message.media,
  )
  message: SMSHistory;
}
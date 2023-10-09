import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";

@Entity('facebook_history')
export default class FacebookHistory extends BaseEntity {
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
  from: string;

  @ApiProperty()
  @Column({ default: null })
  to: string;

  @ApiProperty()
  @Column({ default: null })
  accountSid: string;

  @ApiProperty()
  @Column({ default: null })
  numMedia: string;

  @ApiProperty()
  @Column({ default: null })
  apiVersion: string;

  @ApiProperty()
  @Column({ default: null })
  smsMessageSid: string;

  @ApiProperty()
  @Column({ default: null })
  smsSid: string;

  @ApiProperty()
  @Column({ default: null })
  smsStatus: string;

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
    customer => customer.facebook,
  )
  customer: Customer;
}
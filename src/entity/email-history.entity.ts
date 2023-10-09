import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";

@Entity()
export default class EmailHistory extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // 0: sent, 1: received
  @ApiProperty()
  @Column()
  type: number;
  
  @ApiProperty()
  @Column()
  fromEmail: string;

  @ApiProperty()
  @Column()
  toEmail: string;

  @ApiProperty()
  @Column()
  subject: string;
  
  @ApiProperty()
  @Column({ type: 'text', default: null })
  content: string;
  
  @ApiProperty()
  @Column({ type: 'text', default: null })
  text: string;

  @ApiProperty()
  @Column({ type: 'text', default: null })
  messageId: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @Column()
  customerId: number;

  @ManyToOne(
    type => Customer,
    customer => customer.emails,
  )
  customer: Customer;
}
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";

@Entity('transaction')
export default class Transaction extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: null })
  sid: string;

  @ApiProperty()
  @Column({ default: null })
  oid: string;

  @ApiProperty()
  @Column({ default: null })
  pid: string;

  @ApiProperty()
  @Column({ default: null })
  type: string;

  @ApiProperty()
  @Column({ default: null })
  reference: string;

  @ApiProperty()
  @Column({ default: null })
  description: string;

  @ApiProperty()
  @Column({ default: null })
  date: string;

  @ApiProperty()
  @Column({ default: null })
  amount: string;

  @ApiProperty()
  @Column({ default: null })
  url: string;

  @CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @ManyToOne(
    type => Customer,
    customer => customer.transactions,
  )
  customer: Customer;
}
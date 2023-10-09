import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Customer from "./customer.entity";

@Entity('hd_order')
export default class HDOrder extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: null })
  oid: string;

  @ApiProperty()
  @Column({ default: null })
  bid: string;

  @ApiProperty()
  @Column({ default: null })
  sid: string;

  @ApiProperty()
  @Column({ default: null })
  date: string;
  
  @ApiProperty()
  @Column({ type: 'text', default: null })
  tasks: string;

  @ApiProperty()
  @Column({ default: null })
  subtotal: string;

  @ApiProperty()
  @Column({ default: null })
  taxamount: string;

  @ApiProperty()
  @Column({ default: null })
  balancedue: string;

  @ApiProperty()
  @Column({ default: null })
  total: string;

  @ApiProperty()
  @Column({ default: null })
  invoiceurl: string;

  @ApiProperty()
  @Column({ type: 'text', default: null })
  taxes: string;

  @ApiProperty()
  @Column({ type: 'text', default: null })
  payments: string;

  @ApiProperty()
  @Column({ default: null })
  url: string;

  // Site fields

  @ApiProperty()
  @Column({ default: null })
  status: string;

  @ApiProperty()
  @Column({ default: null })
  purchased: string;

  @ApiProperty()
  @Column({ default: null })
  address: string;

  @ApiProperty()
  @Column({ default: null })
  city: string;

  @ApiProperty()
  @Column({ default: null })
  state: string;

  @ApiProperty()
  @Column({ default: null })
  zip: string;

  @ApiProperty()
  @Column({ default: null })
  beds: string;

  @ApiProperty()
  @Column({ default: null })
  baths: string;

  @ApiProperty()
  @Column({ default: null })
  sqft: string;

  @ApiProperty()
  @Column({ default: null })
  created: string;

  @CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

  @Column()
  customerId: number;

  @ManyToOne(
    type => Customer,
    customer => customer.hdOrders,
  )
  customer: Customer;
}
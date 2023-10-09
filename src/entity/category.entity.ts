import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import EmailHistory from "./email-history.entity";
import Question from "./question.entity";
import SMSHistory from "./sms-history.entity";
import User from "./user.entity";
import VoiceHistory from "./voice-history.entity";

@Entity()
export default class Category extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ nullable: true })
	name: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	@OneToMany(
		type => Question,
		question => question.category,
	)
	questions: Question[];
}
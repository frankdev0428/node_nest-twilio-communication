import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Category from "./category.entity";

@Entity()
export default class Question extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ nullable: true, type: "text" })
	question: string;

	@ApiProperty()
	@Column({ nullable: true, type: "text" })
	answer: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	@ManyToOne(
		type => Category,
		category => category.questions,
	)
	category: Category;
}
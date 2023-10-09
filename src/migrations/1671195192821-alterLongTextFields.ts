import { MigrationInterface, QueryRunner } from "typeorm";

export class alterLongTextFields1671195192821 implements MigrationInterface {
    name = 'alterLongTextFields1671195192821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`mergedCustomers\` \`mergedCustomers\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`content\` \`content\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`messageId\` \`messageId\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`tasks\` \`tasks\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`taxes\` \`taxes\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`payments\` \`payments\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`question\` \`question\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`answer\` \`answer\` TEXT NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`answer\` \`answer\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`question\` \`question\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`payments\` \`payments\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`taxes\` \`taxes\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`tasks\` \`tasks\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`messageId\` \`messageId\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`content\` \`content\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`mergedCustomers\` \`mergedCustomers\` TEXT NULL DEFAULT NULL`);
    }

}

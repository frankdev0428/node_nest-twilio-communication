import { MigrationInterface, QueryRunner } from "typeorm";

export class addMessageIdFieldToEmailHistoryTable1667874350560 implements MigrationInterface {
    name = 'addMessageIdFieldToEmailHistoryTable1667874350560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`messageId\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`messageId\``);
    }

}

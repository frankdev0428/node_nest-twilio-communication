import { MigrationInterface, QueryRunner } from "typeorm";

export class alterEmailHistoryTable1671566561090 implements MigrationInterface {
    name = 'alterEmailHistoryTable1671566561090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`text\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`text\``);
    }

}

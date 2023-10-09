import { MigrationInterface, QueryRunner } from "typeorm";

export class alterWebchatTable1670444175702 implements MigrationInterface {
    name = 'alterWebchatTable1670444175702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`web_chat_history\` ADD \`attachments\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`web_chat_history\` DROP COLUMN \`attachments\``);
    }

}

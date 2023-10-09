import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1669655532546 implements MigrationInterface {
    name = 'alterUserTable1669655532546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isLivechatEnabled\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isCallEnabled\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isCallEnabled\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isLivechatEnabled\``);
    }

}

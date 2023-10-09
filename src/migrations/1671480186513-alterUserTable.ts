import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1671480186513 implements MigrationInterface {
    name = 'alterUserTable1671480186513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaEmail\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaMessenger\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaCall\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaLivechat\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaLivechat\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaCall\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaMessenger\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaEmail\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT '0'`);
    }

}

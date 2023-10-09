import { MigrationInterface, QueryRunner } from "typeorm";

export class addFieldsToUserTable1669046878226 implements MigrationInterface {
    name = 'addFieldsToUserTable1669046878226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`appPassword\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isEmailEnabled\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isEmailEnabled\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`appPassword\``);
    }

}

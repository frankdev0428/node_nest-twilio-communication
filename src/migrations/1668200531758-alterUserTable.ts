import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1668200531758 implements MigrationInterface {
    name = 'alterUserTable1668200531758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isHDEnabled\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isHDEnabled\``);
    }

}

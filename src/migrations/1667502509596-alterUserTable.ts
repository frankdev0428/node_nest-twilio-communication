import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1667502509596 implements MigrationInterface {
    name = 'alterUserTable1667502509596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isFacebookEnabled\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isFacebookEnabled\``);
    }

}

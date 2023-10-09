import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1668189565312 implements MigrationInterface {
    name = 'alterUserTable1668189565312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hdApiKey\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hdApiKey\``);
    }

}

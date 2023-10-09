import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1669341789634 implements MigrationInterface {
    name = 'alterUserTable1669341789634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`adminId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`adminId\``);
    }

}

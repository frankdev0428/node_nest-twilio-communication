import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1675694058125 implements MigrationInterface {
    name = 'alterUserTable1675694058125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`businessName\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`businessName\``);
    }

}

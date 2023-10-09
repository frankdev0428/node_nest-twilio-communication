import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCustomerTable1670893215219 implements MigrationInterface {
    name = 'alterCustomerTable1670893215219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`responseTime\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`responseTime\``);
    }

}

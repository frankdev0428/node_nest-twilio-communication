import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCustomerTable1669161228190 implements MigrationInterface {
    name = 'alterCustomerTable1669161228190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`mergedCustomers\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`mergedCustomers\``);
    }

}

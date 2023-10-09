import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCustomerTable1671924132748 implements MigrationInterface {
    name = 'alterCustomerTable1671924132748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`completedDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`completedDate\``);
    }

}

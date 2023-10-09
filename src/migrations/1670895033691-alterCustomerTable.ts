import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCustomerTable1670895033691 implements MigrationInterface {
    name = 'alterCustomerTable1670895033691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`resolutionTime\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`resolutionTime\``);
    }

}

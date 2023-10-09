import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCustomerTable1668020697426 implements MigrationInterface {
    name = 'alterCustomerTable1668020697426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`uid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`bid\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`bid\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`uid\``);
    }

}

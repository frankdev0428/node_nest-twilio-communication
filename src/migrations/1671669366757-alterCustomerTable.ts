import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCustomerTable1671669366757 implements MigrationInterface {
    name = 'alterCustomerTable1671669366757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`agentUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_aedabe2fdc8d08f60504267c030\` FOREIGN KEY (\`agentUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_aedabe2fdc8d08f60504267c030\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`agentUserId\``);
    }

}

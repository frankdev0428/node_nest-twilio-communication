import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1669993546988 implements MigrationInterface {
    name = 'alterUserTable1669993546988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`loginToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`loginToken\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class addFieldToUserTable1669053299228 implements MigrationInterface {
    name = 'addFieldToUserTable1669053299228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`businessEmail\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`businessEmail\``);
    }

}

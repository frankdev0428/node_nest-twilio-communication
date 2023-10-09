import { MigrationInterface, QueryRunner } from "typeorm";

export class addPortOrderTable1669773487352 implements MigrationInterface {
    name = 'addPortOrderTable1669773487352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`port_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`port_order\` ADD CONSTRAINT \`FK_3376011b75278f65eb99296e5c8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`port_order\` DROP FOREIGN KEY \`FK_3376011b75278f65eb99296e5c8\``);
        await queryRunner.query(`DROP TABLE \`port_order\``);
    }

}

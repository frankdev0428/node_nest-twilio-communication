import { MigrationInterface, QueryRunner } from "typeorm";

export class addTransactionTable1668027155006 implements MigrationInterface {
    name = 'addTransactionTable1668027155006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sid\` varchar(255) NULL, \`oid\` varchar(255) NULL, \`pid\` varchar(255) NULL, \`type\` varchar(255) NULL, \`reference\` varchar(255) NULL, \`description\` varchar(255) NULL, \`date\` varchar(255) NULL, \`amount\` varchar(255) NULL, \`url\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_16ead8467f1f71ac7232aa46ad3\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_16ead8467f1f71ac7232aa46ad3\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
    }

}

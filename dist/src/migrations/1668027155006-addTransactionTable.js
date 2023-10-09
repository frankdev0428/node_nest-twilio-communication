"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransactionTable1668027155006 = void 0;
class addTransactionTable1668027155006 {
    constructor() {
        this.name = 'addTransactionTable1668027155006';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sid\` varchar(255) NULL, \`oid\` varchar(255) NULL, \`pid\` varchar(255) NULL, \`type\` varchar(255) NULL, \`reference\` varchar(255) NULL, \`description\` varchar(255) NULL, \`date\` varchar(255) NULL, \`amount\` varchar(255) NULL, \`url\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_16ead8467f1f71ac7232aa46ad3\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_16ead8467f1f71ac7232aa46ad3\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
    }
}
exports.addTransactionTable1668027155006 = addTransactionTable1668027155006;
//# sourceMappingURL=1668027155006-addTransactionTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHDOrderTable1669412195544 = void 0;
class addHDOrderTable1669412195544 {
    constructor() {
        this.name = 'addHDOrderTable1669412195544';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`hd_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`oid\` varchar(255) NULL, \`bid\` varchar(255) NULL, \`sid\` varchar(255) NULL, \`date\` varchar(255) NULL, \`tasks\` text NOT NULL, \`subtotal\` varchar(255) NULL, \`taxamount\` varchar(255) NULL, \`balancedue\` varchar(255) NULL, \`total\` varchar(255) NULL, \`invoiceurl\` varchar(255) NULL, \`taxes\` text NOT NULL, \`payments\` text NOT NULL, \`url\` varchar(255) NULL, \`status\` varchar(255) NULL, \`purchased\` varchar(255) NULL, \`address\` varchar(255) NULL, \`city\` varchar(255) NULL, \`state\` varchar(255) NULL, \`zip\` varchar(255) NULL, \`beds\` varchar(255) NULL, \`baths\` varchar(255) NULL, \`sqft\` varchar(255) NULL, \`created\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` ADD CONSTRAINT \`FK_2c7c78d3b83f164bd54ec6fd435\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`hd_order\` DROP FOREIGN KEY \`FK_2c7c78d3b83f164bd54ec6fd435\``);
        await queryRunner.query(`DROP TABLE \`hd_order\``);
    }
}
exports.addHDOrderTable1669412195544 = addHDOrderTable1669412195544;
//# sourceMappingURL=1669412195544-addHDOrderTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterCustomerTable1671669366757 = void 0;
class alterCustomerTable1671669366757 {
    constructor() {
        this.name = 'alterCustomerTable1671669366757';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`agentUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_aedabe2fdc8d08f60504267c030\` FOREIGN KEY (\`agentUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_aedabe2fdc8d08f60504267c030\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`agentUserId\``);
    }
}
exports.alterCustomerTable1671669366757 = alterCustomerTable1671669366757;
//# sourceMappingURL=1671669366757-alterCustomerTable.js.map
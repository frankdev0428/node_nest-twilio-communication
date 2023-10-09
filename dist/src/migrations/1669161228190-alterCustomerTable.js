"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterCustomerTable1669161228190 = void 0;
class alterCustomerTable1669161228190 {
    constructor() {
        this.name = 'alterCustomerTable1669161228190';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`mergedCustomers\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`mergedCustomers\``);
    }
}
exports.alterCustomerTable1669161228190 = alterCustomerTable1669161228190;
//# sourceMappingURL=1669161228190-alterCustomerTable.js.map
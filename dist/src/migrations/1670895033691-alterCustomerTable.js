"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterCustomerTable1670895033691 = void 0;
class alterCustomerTable1670895033691 {
    constructor() {
        this.name = 'alterCustomerTable1670895033691';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`resolutionTime\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`resolutionTime\``);
    }
}
exports.alterCustomerTable1670895033691 = alterCustomerTable1670895033691;
//# sourceMappingURL=1670895033691-alterCustomerTable.js.map
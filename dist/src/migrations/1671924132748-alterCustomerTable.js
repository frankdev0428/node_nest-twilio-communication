"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterCustomerTable1671924132748 = void 0;
class alterCustomerTable1671924132748 {
    constructor() {
        this.name = 'alterCustomerTable1671924132748';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`completedDate\` datetime NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`completedDate\``);
    }
}
exports.alterCustomerTable1671924132748 = alterCustomerTable1671924132748;
//# sourceMappingURL=1671924132748-alterCustomerTable.js.map
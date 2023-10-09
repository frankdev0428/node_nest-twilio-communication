"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterCustomerTable1670893215219 = void 0;
class alterCustomerTable1670893215219 {
    constructor() {
        this.name = 'alterCustomerTable1670893215219';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`responseTime\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`responseTime\``);
    }
}
exports.alterCustomerTable1670893215219 = alterCustomerTable1670893215219;
//# sourceMappingURL=1670893215219-alterCustomerTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterCustomerTable1668020697426 = void 0;
class alterCustomerTable1668020697426 {
    constructor() {
        this.name = 'alterCustomerTable1668020697426';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`uid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`bid\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`bid\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`uid\``);
    }
}
exports.alterCustomerTable1668020697426 = alterCustomerTable1668020697426;
//# sourceMappingURL=1668020697426-alterCustomerTable.js.map
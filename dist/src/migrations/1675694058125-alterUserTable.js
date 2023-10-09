"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1675694058125 = void 0;
class alterUserTable1675694058125 {
    constructor() {
        this.name = 'alterUserTable1675694058125';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`businessName\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`businessName\``);
    }
}
exports.alterUserTable1675694058125 = alterUserTable1675694058125;
//# sourceMappingURL=1675694058125-alterUserTable.js.map
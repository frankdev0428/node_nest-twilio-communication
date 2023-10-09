"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1668200531758 = void 0;
class alterUserTable1668200531758 {
    constructor() {
        this.name = 'alterUserTable1668200531758';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isHDEnabled\` tinyint NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isHDEnabled\``);
    }
}
exports.alterUserTable1668200531758 = alterUserTable1668200531758;
//# sourceMappingURL=1668200531758-alterUserTable.js.map
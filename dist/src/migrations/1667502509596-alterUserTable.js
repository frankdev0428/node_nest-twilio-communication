"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1667502509596 = void 0;
class alterUserTable1667502509596 {
    constructor() {
        this.name = 'alterUserTable1667502509596';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isFacebookEnabled\` tinyint NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isFacebookEnabled\``);
    }
}
exports.alterUserTable1667502509596 = alterUserTable1667502509596;
//# sourceMappingURL=1667502509596-alterUserTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1669341789634 = void 0;
class alterUserTable1669341789634 {
    constructor() {
        this.name = 'alterUserTable1669341789634';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`adminId\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`adminId\``);
    }
}
exports.alterUserTable1669341789634 = alterUserTable1669341789634;
//# sourceMappingURL=1669341789634-alterUserTable.js.map
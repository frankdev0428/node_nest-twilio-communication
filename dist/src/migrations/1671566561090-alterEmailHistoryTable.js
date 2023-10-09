"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterEmailHistoryTable1671566561090 = void 0;
class alterEmailHistoryTable1671566561090 {
    constructor() {
        this.name = 'alterEmailHistoryTable1671566561090';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`text\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`text\``);
    }
}
exports.alterEmailHistoryTable1671566561090 = alterEmailHistoryTable1671566561090;
//# sourceMappingURL=1671566561090-alterEmailHistoryTable.js.map
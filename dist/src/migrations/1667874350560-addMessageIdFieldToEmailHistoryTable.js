"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageIdFieldToEmailHistoryTable1667874350560 = void 0;
class addMessageIdFieldToEmailHistoryTable1667874350560 {
    constructor() {
        this.name = 'addMessageIdFieldToEmailHistoryTable1667874350560';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`messageId\` text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`messageId\``);
    }
}
exports.addMessageIdFieldToEmailHistoryTable1667874350560 = addMessageIdFieldToEmailHistoryTable1667874350560;
//# sourceMappingURL=1667874350560-addMessageIdFieldToEmailHistoryTable.js.map
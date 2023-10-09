"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterWebchatTable1670444175702 = void 0;
class alterWebchatTable1670444175702 {
    constructor() {
        this.name = 'alterWebchatTable1670444175702';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`web_chat_history\` ADD \`attachments\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`web_chat_history\` DROP COLUMN \`attachments\``);
    }
}
exports.alterWebchatTable1670444175702 = alterWebchatTable1670444175702;
//# sourceMappingURL=1670444175702-alterWebchatTable.js.map
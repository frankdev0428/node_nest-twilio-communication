"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterVoiceHistoryTable1667530297977 = void 0;
class alterVoiceHistoryTable1667530297977 {
    constructor() {
        this.name = 'alterVoiceHistoryTable1667530297977';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD \`dialBridged\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD \`dialCallSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD \`dialCallStatus\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP COLUMN \`dialCallStatus\``);
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP COLUMN \`dialCallSid\``);
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP COLUMN \`dialBridged\``);
    }
}
exports.alterVoiceHistoryTable1667530297977 = alterVoiceHistoryTable1667530297977;
//# sourceMappingURL=1667530297977-alterVoiceHistoryTable.js.map
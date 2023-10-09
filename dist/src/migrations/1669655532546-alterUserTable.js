"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1669655532546 = void 0;
class alterUserTable1669655532546 {
    constructor() {
        this.name = 'alterUserTable1669655532546';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isLivechatEnabled\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isCallEnabled\` tinyint NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isCallEnabled\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isLivechatEnabled\``);
    }
}
exports.alterUserTable1669655532546 = alterUserTable1669655532546;
//# sourceMappingURL=1669655532546-alterUserTable.js.map
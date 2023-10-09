"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1671480186513 = void 0;
class alterUserTable1671480186513 {
    constructor() {
        this.name = 'alterUserTable1671480186513';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaEmail\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaMessenger\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaCall\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`slaLivechat\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaLivechat\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaCall\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaMessenger\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`slaEmail\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT '0'`);
    }
}
exports.alterUserTable1671480186513 = alterUserTable1671480186513;
//# sourceMappingURL=1671480186513-alterUserTable.js.map
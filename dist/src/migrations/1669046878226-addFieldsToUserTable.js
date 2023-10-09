"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFieldsToUserTable1669046878226 = void 0;
class addFieldsToUserTable1669046878226 {
    constructor() {
        this.name = 'addFieldsToUserTable1669046878226';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`appPassword\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isEmailEnabled\` tinyint NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isEmailEnabled\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`appPassword\``);
    }
}
exports.addFieldsToUserTable1669046878226 = addFieldsToUserTable1669046878226;
//# sourceMappingURL=1669046878226-addFieldsToUserTable.js.map
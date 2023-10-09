"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFieldToUserTable1669053299228 = void 0;
class addFieldToUserTable1669053299228 {
    constructor() {
        this.name = 'addFieldToUserTable1669053299228';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`businessEmail\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`businessEmail\``);
    }
}
exports.addFieldToUserTable1669053299228 = addFieldToUserTable1669053299228;
//# sourceMappingURL=1669053299228-addFieldToUserTable.js.map
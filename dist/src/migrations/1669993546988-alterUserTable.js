"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1669993546988 = void 0;
class alterUserTable1669993546988 {
    constructor() {
        this.name = 'alterUserTable1669993546988';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`loginToken\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`loginToken\``);
    }
}
exports.alterUserTable1669993546988 = alterUserTable1669993546988;
//# sourceMappingURL=1669993546988-alterUserTable.js.map
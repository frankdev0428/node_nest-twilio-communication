"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1668189565312 = void 0;
class alterUserTable1668189565312 {
    constructor() {
        this.name = 'alterUserTable1668189565312';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hdApiKey\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hdApiKey\``);
    }
}
exports.alterUserTable1668189565312 = alterUserTable1668189565312;
//# sourceMappingURL=1668189565312-alterUserTable.js.map
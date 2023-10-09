"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterLongTextFields1671195192821 = void 0;
class alterLongTextFields1671195192821 {
    constructor() {
        this.name = 'alterLongTextFields1671195192821';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`mergedCustomers\` \`mergedCustomers\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`content\` \`content\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`messageId\` \`messageId\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`tasks\` \`tasks\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`taxes\` \`taxes\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`payments\` \`payments\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`question\` \`question\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`answer\` \`answer\` TEXT NULL DEFAULT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`answer\` \`answer\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`question\` \`question\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`payments\` \`payments\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`taxes\` \`taxes\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`hd_order\` CHANGE \`tasks\` \`tasks\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`messageId\` \`messageId\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`content\` \`content\` TEXT NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`mergedCustomers\` \`mergedCustomers\` TEXT NULL DEFAULT NULL`);
    }
}
exports.alterLongTextFields1671195192821 = alterLongTextFields1671195192821;
//# sourceMappingURL=1671195192821-alterLongTextFields.js.map
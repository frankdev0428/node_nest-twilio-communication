"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWebchatHistory1668555695872 = void 0;
class addWebchatHistory1668555695872 {
    constructor() {
        this.name = 'addWebchatHistory1668555695872';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`web_chat_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` int NOT NULL, \`body\` varchar(255) NULL, \`bRead\` tinyint NOT NULL DEFAULT 0, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`web_chat_history\` ADD CONSTRAINT \`FK_f898315792c1149020b13d7a761\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`web_chat_history\` DROP FOREIGN KEY \`FK_f898315792c1149020b13d7a761\``);
        await queryRunner.query(`DROP TABLE \`web_chat_history\``);
    }
}
exports.addWebchatHistory1668555695872 = addWebchatHistory1668555695872;
//# sourceMappingURL=1668555695872-addWebchatHistory.js.map
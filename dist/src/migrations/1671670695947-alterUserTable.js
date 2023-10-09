"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterUserTable1671670695947 = void 0;
class alterUserTable1671670695947 {
    constructor() {
        this.name = 'alterUserTable1671670695947';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countEmail\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countMessenger\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countCall\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countLivechat\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countLivechat\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countCall\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countMessenger\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countEmail\``);
    }
}
exports.alterUserTable1671670695947 = alterUserTable1671670695947;
//# sourceMappingURL=1671670695947-alterUserTable.js.map
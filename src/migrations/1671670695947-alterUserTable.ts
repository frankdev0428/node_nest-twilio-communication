import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1671670695947 implements MigrationInterface {
    name = 'alterUserTable1671670695947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countEmail\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countMessenger\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countCall\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`countLivechat\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countLivechat\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countCall\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countMessenger\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`countEmail\``);
    }

}

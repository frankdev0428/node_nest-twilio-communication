import { MigrationInterface, QueryRunner } from "typeorm";

export class alterVoiceHistoryTable1667530297977 implements MigrationInterface {
    name = 'alterVoiceHistoryTable1667530297977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD \`dialBridged\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD \`dialCallSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD \`dialCallStatus\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP COLUMN \`dialCallStatus\``);
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP COLUMN \`dialCallSid\``);
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP COLUMN \`dialBridged\``);
    }

}

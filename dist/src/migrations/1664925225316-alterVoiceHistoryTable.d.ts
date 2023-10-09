import { MigrationInterface, QueryRunner } from "typeorm";
export declare class alterVoiceHistoryTable1664925225316 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

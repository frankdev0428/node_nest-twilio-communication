import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addVoiceHistoryTable1664747352568 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addTimestampsToSMSHistoryTable1663618372888 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addRecordHistoryTable1665100437383 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

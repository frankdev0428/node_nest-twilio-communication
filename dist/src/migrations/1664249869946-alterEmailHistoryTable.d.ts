import { MigrationInterface, QueryRunner } from "typeorm";
export declare class alterEmailHistoryTable1664249869946 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

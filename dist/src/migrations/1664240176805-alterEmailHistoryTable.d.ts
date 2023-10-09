import { MigrationInterface, QueryRunner } from "typeorm";
export declare class alterEmailHistoryTable1664240176805 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

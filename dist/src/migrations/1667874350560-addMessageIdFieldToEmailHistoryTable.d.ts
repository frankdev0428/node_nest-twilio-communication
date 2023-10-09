import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addMessageIdFieldToEmailHistoryTable1667874350560 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

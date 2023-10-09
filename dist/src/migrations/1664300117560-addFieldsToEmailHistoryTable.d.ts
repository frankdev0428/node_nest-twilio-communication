import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addFieldsToEmailHistoryTable1664300117560 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

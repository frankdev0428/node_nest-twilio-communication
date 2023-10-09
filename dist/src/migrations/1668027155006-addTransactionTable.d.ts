import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addTransactionTable1668027155006 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

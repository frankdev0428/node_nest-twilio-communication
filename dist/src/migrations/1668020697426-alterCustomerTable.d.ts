import { MigrationInterface, QueryRunner } from "typeorm";
export declare class alterCustomerTable1668020697426 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

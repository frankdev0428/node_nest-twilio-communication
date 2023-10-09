import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addContactFieldsToCustomerTable1665538012421 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

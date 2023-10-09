import { MigrationInterface, QueryRunner } from "typeorm";
export declare class alterLongTextFields1671195192821 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addHDOrderTable1669412195544 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

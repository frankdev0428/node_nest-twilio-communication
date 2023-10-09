import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addNameFieldToUserTable1666832270544 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

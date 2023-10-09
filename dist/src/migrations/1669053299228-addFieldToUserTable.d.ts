import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addFieldToUserTable1669053299228 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

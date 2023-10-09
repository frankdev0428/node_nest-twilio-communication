import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addFieldsToUserTable1669046878226 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

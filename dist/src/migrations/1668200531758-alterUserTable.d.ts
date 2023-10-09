import { MigrationInterface, QueryRunner } from "typeorm";
export declare class alterUserTable1668200531758 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

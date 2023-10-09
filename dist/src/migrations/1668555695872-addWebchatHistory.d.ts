import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addWebchatHistory1668555695872 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

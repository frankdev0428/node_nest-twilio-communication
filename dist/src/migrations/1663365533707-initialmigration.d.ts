import { MigrationInterface, QueryRunner } from "typeorm";
export declare class initialmigration1663365533707 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

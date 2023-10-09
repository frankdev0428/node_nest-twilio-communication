import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addChatHistoryTable1666809212066 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

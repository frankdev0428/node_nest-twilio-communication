import { MigrationInterface, QueryRunner } from "typeorm";

export class initialmigration1663365533707 implements MigrationInterface {
    name = 'initialmigration1663365533707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`zipCode\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`type\` int NOT NULL, \`status\` int NOT NULL, \`dueDate\` datetime NOT NULL, \`avatar\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`twitter\` varchar(255) NOT NULL, \`facebook\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`email\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sms_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` int NOT NULL, \`body\` varchar(255) NULL, \`numSegments\` varchar(255) NULL, \`direction\` varchar(255) NULL, \`from\` varchar(255) NULL, \`to\` varchar(255) NULL, \`dateUpdated\` datetime NULL, \`price\` varchar(255) NULL, \`errorMessage\` varchar(255) NULL, \`uri\` varchar(255) NULL, \`accountSid\` varchar(255) NULL, \`numMedia\` varchar(255) NULL, \`status\` varchar(255) NULL, \`messagingServiceSid\` varchar(255) NULL, \`sid\` varchar(255) NULL, \`dateSent\` datetime NULL, \`dateCreated\` datetime NULL, \`errorCode\` int NULL, \`priceUnit\` varchar(255) NULL, \`apiVersion\` varchar(255) NULL, \`subresourceUris\` varchar(255) NULL, \`toCountry\` varchar(255) NULL, \`toState\` varchar(255) NULL, \`smsMessageSid\` varchar(255) NULL, \`toCity\` varchar(255) NULL, \`fromZip\` varchar(255) NULL, \`smsSid\` varchar(255) NULL, \`fromState\` varchar(255) NULL, \`smsStatus\` varchar(255) NULL, \`fromCity\` varchar(255) NULL, \`fromCountry\` varchar(255) NULL, \`toZip\` varchar(255) NULL, \`referralNumMedia\` varchar(255) NULL, \`messageSid\` varchar(255) NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`history\` ADD CONSTRAINT \`FK_7d339708f0fa8446e3c4128dea9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_3f62b42ed23958b120c235f74df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` ADD CONSTRAINT \`FK_33cc0bcc588c921d6c3b1e77beb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sms_history\` DROP FOREIGN KEY \`FK_33cc0bcc588c921d6c3b1e77beb\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_3f62b42ed23958b120c235f74df\``);
        await queryRunner.query(`ALTER TABLE \`history\` DROP FOREIGN KEY \`FK_7d339708f0fa8446e3c4128dea9\``);
        await queryRunner.query(`DROP TABLE \`sms_history\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`history\``);
    }

}

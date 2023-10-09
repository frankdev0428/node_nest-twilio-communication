import { MigrationInterface, QueryRunner } from "typeorm";

export class addVoiceHistoryTable1664747352568 implements MigrationInterface {
    name = 'addVoiceHistoryTable1664747352568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`voice_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` int NOT NULL, \`accountSid\` varchar(255) NULL, \`apiVersion\` varchar(255) NULL, \`applicationSid\` varchar(255) NULL, \`callSid\` varchar(255) NULL, \`callStatus\` varchar(255) NULL, \`callToken\` varchar(255) NULL, \`called\` varchar(255) NULL, \`calledCity\` varchar(255) NULL, \`calledCountry\` varchar(255) NULL, \`calledState\` varchar(255) NULL, \`calledZip\` varchar(255) NULL, \`caller\` varchar(255) NULL, \`callerCity\` varchar(255) NULL, \`callerCountry\` varchar(255) NULL, \`callerState\` varchar(255) NULL, \`callerZip\` varchar(255) NULL, \`direction\` varchar(255) NULL, \`from\` varchar(255) NULL, \`fromCity\` varchar(255) NULL, \`fromCountry\` varchar(255) NULL, \`fromState\` varchar(255) NULL, \`fromZip\` varchar(255) NULL, \`stirPassportToken\` varchar(255) NULL, \`stirVerstat\` varchar(255) NULL, \`to\` varchar(255) NULL, \`toCity\` varchar(255) NULL, \`toCountry\` varchar(255) NULL, \`toState\` varchar(255) NULL, \`toZip\` varchar(255) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP FOREIGN KEY \`FK_2a0b6d85f12841b08f34ad93d07\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` DROP FOREIGN KEY \`FK_33cc0bcc588c921d6c3b1e77beb\``);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`body\` \`body\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`numSegments\` \`numSegments\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`direction\` \`direction\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`from\` \`from\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`to\` \`to\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`dateUpdated\` \`dateUpdated\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`price\` \`price\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`errorMessage\` \`errorMessage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`uri\` \`uri\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`accountSid\` \`accountSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`numMedia\` \`numMedia\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`status\` \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`messagingServiceSid\` \`messagingServiceSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`sid\` \`sid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`dateSent\` \`dateSent\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`dateCreated\` \`dateCreated\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`errorCode\` \`errorCode\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`priceUnit\` \`priceUnit\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`apiVersion\` \`apiVersion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`subresourceUris\` \`subresourceUris\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toCountry\` \`toCountry\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toState\` \`toState\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`smsMessageSid\` \`smsMessageSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toCity\` \`toCity\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromZip\` \`fromZip\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`smsSid\` \`smsSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromState\` \`fromState\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`smsStatus\` \`smsStatus\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromCity\` \`fromCity\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromCountry\` \`fromCountry\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toZip\` \`toZip\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`referralNumMedia\` \`referralNumMedia\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`messageSid\` \`messageSid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_3f62b42ed23958b120c235f74df\``);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`number\` \`number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`street\` \`street\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD CONSTRAINT \`FK_2a0b6d85f12841b08f34ad93d07\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` ADD CONSTRAINT \`FK_33cc0bcc588c921d6c3b1e77beb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`voice_history\` ADD CONSTRAINT \`FK_0aa7c12ff1897a10b9c1fddb7c0\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_3f62b42ed23958b120c235f74df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_3f62b42ed23958b120c235f74df\``);
        await queryRunner.query(`ALTER TABLE \`voice_history\` DROP FOREIGN KEY \`FK_0aa7c12ff1897a10b9c1fddb7c0\``);
        await queryRunner.query(`ALTER TABLE \`sms_history\` DROP FOREIGN KEY \`FK_33cc0bcc588c921d6c3b1e77beb\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP FOREIGN KEY \`FK_2a0b6d85f12841b08f34ad93d07\``);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`city\` \`city\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`street\` \`street\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`number\` \`number\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_3f62b42ed23958b120c235f74df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`messageSid\` \`messageSid\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`referralNumMedia\` \`referralNumMedia\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toZip\` \`toZip\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromCountry\` \`fromCountry\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromCity\` \`fromCity\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`smsStatus\` \`smsStatus\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromState\` \`fromState\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`smsSid\` \`smsSid\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`fromZip\` \`fromZip\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toCity\` \`toCity\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`smsMessageSid\` \`smsMessageSid\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toState\` \`toState\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`toCountry\` \`toCountry\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`subresourceUris\` \`subresourceUris\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`apiVersion\` \`apiVersion\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`priceUnit\` \`priceUnit\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`errorCode\` \`errorCode\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`dateCreated\` \`dateCreated\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`dateSent\` \`dateSent\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`sid\` \`sid\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`messagingServiceSid\` \`messagingServiceSid\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`status\` \`status\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`numMedia\` \`numMedia\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`accountSid\` \`accountSid\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`uri\` \`uri\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`errorMessage\` \`errorMessage\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`price\` \`price\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`dateUpdated\` \`dateUpdated\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`to\` \`to\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`from\` \`from\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`direction\` \`direction\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`numSegments\` \`numSegments\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` CHANGE \`body\` \`body\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` ADD CONSTRAINT \`FK_33cc0bcc588c921d6c3b1e77beb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD CONSTRAINT \`FK_2a0b6d85f12841b08f34ad93d07\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`voice_history\``);
    }

}

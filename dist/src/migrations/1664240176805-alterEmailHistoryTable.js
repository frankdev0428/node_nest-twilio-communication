"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterEmailHistoryTable1664240176805 = void 0;
class alterEmailHistoryTable1664240176805 {
    constructor() {
        this.name = 'alterEmailHistoryTable1664240176805';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`zipCode\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`street\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`dueDate\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP FOREIGN KEY \`FK_2a0b6d85f12841b08f34ad93d07\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_3f62b42ed23958b120c235f74df\``);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`number\` \`number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`street\` \`street\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`userId\` \`userId\` int NULL`);
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
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD CONSTRAINT \`FK_2a0b6d85f12841b08f34ad93d07\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_3f62b42ed23958b120c235f74df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sms_history\` ADD CONSTRAINT \`FK_33cc0bcc588c921d6c3b1e77beb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`sms_history\` DROP FOREIGN KEY \`FK_33cc0bcc588c921d6c3b1e77beb\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_3f62b42ed23958b120c235f74df\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP FOREIGN KEY \`FK_2a0b6d85f12841b08f34ad93d07\``);
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
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`zipCode\` \`zipCode\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`city\` \`city\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`street\` \`street\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`number\` \`number\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_3f62b42ed23958b120c235f74df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_history\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD CONSTRAINT \`FK_2a0b6d85f12841b08f34ad93d07\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_history\` DROP COLUMN \`subject\``);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`avatar\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`dueDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`type\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`street\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`zipCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_history\` ADD \`firstName\` varchar(255) NOT NULL`);
    }
}
exports.alterEmailHistoryTable1664240176805 = alterEmailHistoryTable1664240176805;
//# sourceMappingURL=1664240176805-alterEmailHistoryTable.js.map
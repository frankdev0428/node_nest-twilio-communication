"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
require('dotenv').config({ path: '.env.local' });
exports.ormConfig = {
    type: 'mysql',
    port: 3306,
    migrationsTableName: 'custom_migration_table',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    socketPath: undefined,
    extra: {},
    entities: [
        'dist/src/entity/*.js',
    ],
    migrations: [
        'dist/src/migrations/*.js',
    ],
};
//# sourceMappingURL=ormconfig.js.map
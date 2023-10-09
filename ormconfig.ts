import { DataSourceOptions } from "typeorm";
require('dotenv').config({ path: '.env.local' });

export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  port: 3306,
  migrationsTableName: 'custom_migration_table',
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
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

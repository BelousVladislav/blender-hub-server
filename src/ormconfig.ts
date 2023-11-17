// import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config({ path: './env/development.env' })

export const conn: DataSourceOptions = {
    type: 'mssql',
    host: process.env.MS_HOST,
    port: +process.env.MS_PORT,
    username: process.env.MS_USER,
    password: process.env.MS_PASSWORD,
    database: process.env.MS_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    options: {
        encrypt: false
    },
    pool: {
        max: 10
    }
};

export default new DataSource(conn);

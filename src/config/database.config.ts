import { registerAs } from '@nestjs/config';

export default registerAs('databaseConf', () => ({
    host: process.env.MS_HOST,
    port: parseInt(process.env.MS_PORT) || 1433,
    database: process.env.MS_DATABASE,
    user: process.env.MS_USER,
    password: process.env.MS_PASSWORD,
}));

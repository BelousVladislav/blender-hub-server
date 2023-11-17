import { registerAs } from '@nestjs/config';

export default registerAs('jwtConf', () => ({
    secret: process.env.JWT_SECRET,
}));


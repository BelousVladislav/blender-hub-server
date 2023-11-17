import * as joi from 'joi';

export const validationSchema = joi.object({
    NODE_ENV: joi.string().valid('development', 'production', 'test'),
    PORT: joi.number().required(),
    // MS_HOST: joi.string().required(),
    // MS_PORT: joi.number().default(1433),
    // MS_DATABASE: joi.string().required(),
    // MS_USER: joi.string().required(),
    // MS_PASSWORD: joi.string().required(),
    // REDIS_HOST: joi.string().required(),
    // REDIS_PORT: joi.number().default(6379),
    // FTP_HOST: joi.string().required(),
    // FTP_PORT: joi.number().default(22),
    // FTP_USER: joi.string().required(),
    // FTP_PASSWORD: joi.string().required(),
    // MS21_HOST: joi.string().required(),
    // MS21_PORT: joi.number().default(1433),
    // MS21_DATABASE: joi.string().required(),
    // MS21_USER: joi.string().required(),
    // MS21_PASSWORD: joi.string().required(),
});
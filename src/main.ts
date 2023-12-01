import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        logger: WinstonModule.createLogger({
            transports: [
                new transports.DailyRotateFile({
                    filename: `logs/%DATE%-error.log`,
                    level: 'error',
                    format: format.combine(format.timestamp(), format.json()),
                    datePattern: 'DD-MM-YYYY',
                    zippedArchive: false, // don't want to zip our logs
                    maxFiles: '10d', // will keep log until they are older than 30 days
                }),
                new transports.Console({
                    format: format.combine(
                        format.cli(),
                        format.splat(),
                        format.timestamp(),
                        format.printf((info) => {
                            return `${info.timestamp} ${info.level}: ${info.message}`;
                        }),
                    ),
                }),
            ],
        }),
    });

    const config = new DocumentBuilder()
        .setTitle('FreeBlender API')
        .setDescription('FreeBlender API')
        .setVersion('1.0')
        .addTag('renders')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    // app.useGlobalPipes(new ValidationPipe({
    //     whitelist: true,
    //     transform: true,
    // }));
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.setGlobalPrefix('api');
    const configService = app.get(ConfigService);
    const port = configService.get('serverConf.port');
    await app.listen(port);
    console.log(process.env.NODE_ENV);
    console.info(`Application is running on: ${await app.getUrl()}/api`);
    console.info(`Application is running on: ${await app.getUrl()}/admin`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serverConfig from './config/server.config';
import { validationSchema } from './config/validation.config';
import { UserModule } from './components/user/user.module';
import databaseConfig from './config/database.config';
import { User } from './components/user/entities/user.entity';
import { AuthService } from './auth/auth.service';
import jwtConfig from './config/jwt.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { conn } from './ormconfig';
import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { WorkerModule } from './worker/worker.module';

AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
});

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
            load: [serverConfig, databaseConfig, jwtConfig],
            isGlobal: true,
            validationSchema,
        }),
        TypeOrmModule.forRoot(conn),
        AdminModule.createAdminAsync({
            useFactory: () => ({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        User
                    ],
                },
                // auth: {
                //     authenticate,
                //     cookieName: 'adminjs',
                //     cookiePassword: 'secret'
                // },
                // sessionOptions: {
                //     resave: true,
                //     saveUninitialized: true,
                //     secret: 'secret'
                // },
            }),
        }),
        UserModule,
        AuthModule,
        PassportModule,
        WorkerModule,
        JwtModule.registerAsync({
            imports: [
                ConfigModule
            ],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwtConf.secret'),
                signOptions: { expiresIn: '24h' },
            }),
            inject: [ConfigService],
        }),
        // SocketModule
    ],
    controllers: [AppController],
    providers: [
        AuthService,
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthInterceptor,
        },
    ],
})
export class AppModule { }

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
import { WorkerModule } from './components/worker/worker.module';
import { Worker } from './components/worker/entities/worker.entity';
import { ProjectModule } from './components/project/project.module';
import { Project } from './components/project/entities/project.entity';
import { RenderModule } from './components/render/render.module';
import { Status } from './components/status/entities/status.entity';
import { Render } from './components/render/entities/render.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from './components/comment/comment.module';
import { Comment } from './components/comment/entities/comment.entity';

AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
});

const DEFAULT_ADMIN = {
    email: 'sa',
    password: 'Sa121218',
}

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

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
                        {
                            resource: Worker,
                            options: {
                                showProperties: [
                                    'id',
                                    'blenderVersion',
                                    'os',
                                    'gpuName',
                                    'donate',
                                    'userId',
                                    'isOnline',
                                    'currSocketId'
                                ],
                                editProperties: [
                                    'id',
                                    'blenderVersion',
                                    'os',
                                    'gpuName',
                                    'donate',
                                    'userId',
                                    'isOnline',
                                    'currSocketId'
                                ],
                                sort: {
                                    sortBy: 'id',
                                    direction: 'asc',
                                },
                            }
                        },
                        User,
                        Project,
                        Render,
                        Status,
                        Comment
                    ],
                },
                auth: {
                    authenticate,
                    cookieName: 'adminjs',
                    cookiePassword: 'secret'
                },
                sessionOptions: {
                    resave: true,
                    saveUninitialized: true,
                    secret: 'secret'
                },
            }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'rendered')
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
        ProjectModule,
        RenderModule,
        CommentModule
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

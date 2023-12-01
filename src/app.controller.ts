import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('app')
@Controller()
export class AppController {

    constructor(private _configService: ConfigService) { }

    @Get()
    getEnvironment(): string {
        return `<h1>${this._configService
            .get<string>('NODE_ENV')
            .toUpperCase()}</h1><h5>server mode</h5>`;
    }

}

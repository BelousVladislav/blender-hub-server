import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../components/user/user.service';
import { CreateUserDto } from '../components/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneBy({ "login": login });
        if (!user) throw new HttpException('Користувача не існує', HttpStatus.NOT_FOUND);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                login: user.login
            }
        };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('jwtConf.secret') }),
        }
    }

    async register(createUserDto: CreateUserDto) {
        let response = await this.usersService.create(createUserDto);
        if (response) {
            const result = response;
            return result;
        }
    }

    decodeToken(token): any {
        return this.jwtService.decode(token)
    }
}

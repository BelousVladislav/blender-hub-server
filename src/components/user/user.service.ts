import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        let userNameExist = await this.usersRepository.exist({ where: { login: createUserDto.userName } })
        let emailExist = await this.usersRepository.exist({ where: { email: createUserDto.email } })
        if (userNameExist) throw new HttpException('Користувач з таким логіном вже існує', HttpStatus.BAD_REQUEST);
        if (emailExist) throw new HttpException('Користувач з таким email вже існує', HttpStatus.BAD_REQUEST);
        let user = this.usersRepository.create({ ...createUserDto as any });
        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<User[] | undefined> {
        return await this.usersRepository.find();
    }

    async findOneBy(data: object): Promise<User | undefined> {
        return await this.usersRepository.findOneBy(data);
    }

    async findById(id: number): Promise<User | undefined> {
        return await this.usersRepository.findOneBy({ id });
    }

    update(updateUserDto: UpdateUserDto) {
        return this.usersRepository.save({ ...updateUserDto as any }, { reload: true })
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }
}

import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) { }
    async create(createCommentDto: CreateCommentDto) {
        let comment = await this.commentRepository.create(createCommentDto);
        return await this.commentRepository.save(comment);
    }

    async findAll() {
        return await this.commentRepository.find({ relations: { user: true }, order: { createdAt: 'DESC' } });
    }

    async findMoreBy(data: any): Promise<Comment[]> {
        return (await this.commentRepository.find({ where: data, relations: { user: true }, order: { createdAt: 'DESC' } }));
    }

    async remove(id: number) {
        await this.commentRepository.delete(id);
    }
}

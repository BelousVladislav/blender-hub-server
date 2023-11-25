import { Injectable } from '@nestjs/common';
import { CreateRenderDto } from './dto/create-render.dto';
import { UpdateRenderDto } from './dto/update-render.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Render } from './entities/render.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class RenderService {
    constructor(
        @InjectRepository(Render) private renderRepository: Repository<Render>
    ) { }

    async create(createRenderDto: CreateRenderDto) {
        let render = this.renderRepository.create(createRenderDto);
        return await this.renderRepository.save(render);
    }

    async findAll() {
        return await this.renderRepository.find({ relations: { worker: true, project: true, status: true } });
    }

    async findById(id: number): Promise<Render | undefined> {
        return await this.renderRepository.findOne({ where: { id: id }, relations: { worker: true, project: true, status: true } });
    }

    async findOneBy(data: any): Promise<Render | undefined> {
        return await this.renderRepository.findOne({ where: data, relations: { worker: true, project: true, status: true } });
    }

    async findMoreBy(data: any): Promise<Render[]> {
        return (await this.renderRepository.find({ where: data, relations: { worker: true, project: true, status: true }, order: { id: "DESC" } }));
    }

    async update(updateRenderDto: UpdateRenderDto) {
        await this.renderRepository.save(updateRenderDto, { reload: true });
        return await this.findById(updateRenderDto.id);
    }

    async updateRenderProgress(renderId: number, renderProgress: number) {
        return await this.renderRepository.createQueryBuilder()
            .update()
            .set({ progress: renderProgress })
            .where("id = :id", { id: renderId })
            .execute();
    }

    async uploadRenderedFileFromWorker(renderId: number, file: any) {
        let render = await this.renderRepository.findOneBy({ id: renderId });
        let fileName = render.inFileUUIDName.substring(0, render.inFileUUIDName.indexOf('.')) + file.originalname.substring(file.originalname.indexOf('.'))
        fs.writeFileSync(join(process.cwd(), 'rendered', fileName), file.buffer);
        render.statusId = 3;
        render.progress = 100;
        render.outFileOriginalName = render.inFileOriginalName.substring(0, render.inFileOriginalName.indexOf('.')) + file.originalname.substring(file.originalname.indexOf('.'));
        render.outFileUUIDName = fileName;
        render.outFilePath = `./rendered/${fileName}`;
        return await this.update(render);
    }

    async remove(id: number) {
        await this.renderRepository.delete(id);
    }
}

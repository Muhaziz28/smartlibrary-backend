import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddModulPengantarDto } from './dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ModulPengantarService {
    constructor(private prisma: PrismaService) { }

    async addModulPengantar(data: any, dto: AddModulPengantarDto, pengantarId: number) {
        try {
            const pengantar = await this.prisma.pengantar.findUnique({
                where: { id: pengantarId },
            });
            if (!pengantar) throw new NotFoundException('Pengantar tidak ditemukan');
            if (!(data.file || dto.deskripsi || dto.link || dto.judul)) {
                throw new NotFoundException('Data tidak boleh kosong');
            }
            const modulPengantar = await this.prisma.modulPengantar.create({
                data: {
                    pengantarId: pengantarId,
                    judul: dto.judul,
                    deskripsi: dto.deskripsi,
                    link: dto.link,
                    file: data.file,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            return modulPengantar;
        } catch (error) { throw error }
    }

    async updateModulPengantar(id: number, data: any, dto: AddModulPengantarDto) {
        try {
            const modulPengantar = await this.prisma.modulPengantar.findUnique({ where: { id } })
            if (!modulPengantar) throw new NotFoundException('Modul tidak ditemukan');
            if (modulPengantar.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'modul-pengantar', modulPengantar.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            if (!(data.file || dto.deskripsi || dto.link || dto.judul)) {
                throw new NotFoundException('Data tidak boleh kosong');
            }
            const updatedModulPengantar = await this.prisma.modulPengantar.update({
                where: { id },
                data: {
                    judul: dto.judul,
                    deskripsi: dto.deskripsi,
                    link: dto.link,
                    file: data.file,
                    updatedAt: new Date(),
                },
            });
            return updatedModulPengantar;
        } catch (error) { throw error }
    }

    async deleteModulPengantar(id: number) {
        try {
            const modulPengantar = await this.prisma.modulPengantar.findUnique({ where: { id } });
            if (!modulPengantar) throw new NotFoundException('Modul tidak ditemukan');
            if (modulPengantar.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'modul-pengantar', modulPengantar.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const deletedModulPengantar = await this.prisma.modulPengantar.delete({ where: { id } });
            return deletedModulPengantar;
        } catch (error) { throw error }
    }
}

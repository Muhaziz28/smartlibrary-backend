import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPengantarDto } from './dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PengantarService {
    constructor(private prisma: PrismaService) { }

    async addPengantar(data: any, dto: AddPengantarDto, sesiMataKuliahId: number) {
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findUnique({
                where: { id: sesiMataKuliahId },
            });
            if (!sesiMataKuliah) throw new NotFoundException('Sesi Mata Kuliah tidak ditemukan');
            const pengantar = await this.prisma.pengantar.create({
                data: {
                    sesiMataKuliahId: sesiMataKuliahId,
                    link: dto.link,
                    deskripsi: dto.deskripsi,
                    file: data.file,
                    video: dto.video,
                },
                include: { sesiMataKuliah: true }
            });
            return pengantar;
        } catch (error) {
            if (error.code === 'P2002') throw new ConflictException('Pengantar sudah ada');
            throw error
        }
    }

    async getPengantar(id: number, req: any) {
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findUnique({ where: { id } });
            if (!sesiMataKuliah) throw new NotFoundException('Sesi Mata Kuliah tidak ditemukan');
            const pengantar = await this.prisma.pengantar.findFirst({
                where: { sesiMataKuliahId: id },
                include: {
                    Rps: true,
                    ModulPengantar: true,
                    Group: true
                }
            });
            if (!pengantar) throw new NotFoundException('Pengantar tidak ditemukan');
            if (pengantar.file) { pengantar.file = `http://${req.headers.host}/public/pengantar/${pengantar.file}`; }
            pengantar.Rps.forEach(rps => {
                if (rps.file) { rps.file = `http://${req.headers.host}/public/rps/${rps.file}`; }

            });
            return pengantar;
        } catch (error) { throw error }
    }

    async updatePengantar(id: number, data: any) {
        try {
            const pengantar = await this.prisma.pengantar.findUnique({ where: { id } })
            if (!pengantar) throw new NotFoundException('Pengantar tidak ditemukan');
            if (pengantar.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'pengantar', pengantar.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const updatedPengantar = await this.prisma.pengantar.update({
                where: { id },
                data: {
                    deskripsi: data.deskripsi,
                    file: data.file,
                    link: data.link,
                    video: data.video,
                },
                include: { sesiMataKuliah: true, }
            });
            return updatedPengantar;
        } catch (error) { throw error }
    }
}

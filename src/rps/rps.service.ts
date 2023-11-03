import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRPSDto } from './dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RpsService {
    constructor(private prisma: PrismaService) { }

    async addRps(data: any, dto: AddRPSDto, pengantarId: number) {
        try {
            const pengantar = await this.prisma.pengantar.findUnique({
                where: { id: pengantarId },
            });
            if (!pengantar) throw new NotFoundException('Pengantar tidak ditemukan');
            if (!(data.file || dto.deskripsi || dto.link)) {
                throw new NotFoundException('Deskripsi dan Link tidak boleh kosong');
            }
            const rps = await this.prisma.rps.create({
                data: {
                    pengantarId: pengantarId,
                    link: dto.link,
                    deskripsi: dto.deskripsi,
                    file: data.file,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            return rps;
        } catch (error) { throw error }
    }

    async updateRps(id: number, data: any, dto: AddRPSDto) {
        try {
            const rps = await this.prisma.rps.findUnique({ where: { id } })
            if (!rps) throw new NotFoundException('Rps tidak ditemukan');
            if (rps.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'rps', rps.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const updatedRps = await this.prisma.rps.update({
                where: { id },
                data: {
                    link: dto.link,
                    deskripsi: dto.deskripsi,
                    file: data.file,
                    updatedAt: new Date(),
                },
            });
            return updatedRps;
        } catch (error) { throw error }
    }

    async deleteRps(id: number) {
        try {
            const rps = await this.prisma.rps.findUnique({ where: { id } });
            if (!rps) throw new NotFoundException('Rps tidak ditemukan');
            if (rps.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'rps', rps.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const deletedRps = await this.prisma.rps.delete({ where: { id } });
            return deletedRps;
        } catch (error) { throw error }
    }
}

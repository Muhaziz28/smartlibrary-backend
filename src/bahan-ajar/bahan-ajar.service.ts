import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BahanAjarDto } from './dto';
import * as path from 'path';
import * as fs from 'fs';
import { BahanAjar, Role, User } from '@prisma/client';

@Injectable()
export class BahanAjarService {
    constructor(private prisma: PrismaService) { }

    async getBahanAjar(file: string, req: any) {
        try {
            const bahanAjar = await this.prisma.bahanAjar.findMany();
            if (bahanAjar.length === 0) throw new NotFoundException('Bahan ajar tidak ditemukan');
            const bahanAjarWithFile = bahanAjar.map((bahanAjar) => {
                if (bahanAjar.file != null) bahanAjar.file = `${req.protocol}://${req.headers.host}/public/bahan-ajar/${bahanAjar.file}`;
                else bahanAjar.file = null;
                return bahanAjar;
            });
            return bahanAjarWithFile;
        } catch (error) { throw error }
    }

    async addBahanAjar(pertemuanId: number, dto: BahanAjarDto, data: any) {
        try {
            const pertemuan = await this.prisma.pertemuan.findUnique({ where: { id: pertemuanId } });
            if (!pertemuan) throw new NotFoundException('Pertemuan tidak ditemukan');
            const bahanAjar = await this.prisma.bahanAjar.create({
                data: {
                    pertemuanId: pertemuanId,
                    file: data.file,
                    link: dto.link,
                    judul: dto.judul,
                    video: dto.video,
                }
            });
            if (bahanAjar.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'bahan-ajar', bahanAjar.file);
            }
            return bahanAjar;
        } catch (error) { throw error }
    }

    async updateBahanAjar(id: number, dto: BahanAjar, data: any, user: User) {
        try {
            const bahanAjar = await this.prisma.bahanAjar.findUnique({ where: { id: id } });
            if (!bahanAjar) throw new NotFoundException('Bahan ajar tidak ditemukan');
            if (bahanAjar.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'bahan-ajar', bahanAjar.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const bahanAjarUpdate = await this.prisma.bahanAjar.update({
                data: {
                    file: data.file,
                    link: dto.link,
                    judul: dto.judul,
                    video: dto.video,
                },
                where: { id: id }
            });
            return bahanAjarUpdate;
        } catch (error) { throw error }
    }

    async removeBahanAjar(user: User, id: number) {
        try {
            if (user.role == Role.MAHASISWA) throw new NotFoundException('Anda tidak memiliki akses');
            const bahanAjar = await this.prisma.bahanAjar.findUnique({ where: { id: id }, });
            if (!bahanAjar) throw new NotFoundException('Bahan ajar tidak ditemukan');
            if (bahanAjar.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'bahan-ajar', bahanAjar.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const bahanAjarDelete = await this.prisma.bahanAjar.delete({ where: { id: id } });
            return bahanAjarDelete;
        } catch (error) { throw error }
    }
}

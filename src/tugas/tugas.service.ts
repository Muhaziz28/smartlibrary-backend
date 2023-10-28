import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TugasService {
    constructor(private prisma: PrismaService) { }

    async getTugas(user: User, pertemuanId: number, req: any) {
        try {
            const tugas = await this.prisma.tugas.findMany({ where: { pertemuanId: pertemuanId } })
            if (tugas.length === 0) throw new NotFoundException('Tugas tidak ditemukan');
            const tugasWithFile = tugas.map((tugas) => {
                if (tugas.file != null) tugas.file = `${req.protocol}://${req.headers.host}/tugas/${tugas.file}`;
                else tugas.file = null;
                return tugas;
            });
            return tugasWithFile;
        } catch (error) { throw error }
    }

    async getTugasById(user: User, id: number, req: any) {
        try {
            const tugas = await this.prisma.tugas.findUnique({ where: { id: id } })
            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');
            if (tugas.file != null) tugas.file = `${req.protocol}://${req.headers.host}/tugas/${tugas.file}`;
            else tugas.file = null;
            return tugas;
        } catch (error) { throw error }
    }

    async addTugas(data: any, id: number) {
        try {
            const tugas = await this.prisma.tugas.create({
                data: {
                    file: data.file,
                    link: data.link,
                    deskripsi: data.deskripsi,
                    tanggal: data.tanggal,
                    pertemuanId: id,
                }
            });
            if (tugas.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'tugas', tugas.file);
            }
            return tugas;
        } catch (error) { throw error }
    }

    async updateTugas(user: User, data: any, id: number) {
        try {
            if (user.role == Role.MAHASISWA) throw new NotFoundException('Anda tidak memiliki akses');
            const tugas = await this.prisma.tugas.findUnique({ where: { id: id } });
            if (tugas.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'tugas', tugas.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const tugasUpdate = await this.prisma.tugas.update({
                data: {
                    file: data.file,
                    link: data.link,
                    deskripsi: data.deskripsi,
                    tanggal: data.tanggal,
                },
                where: { id: id }
            });
            return tugasUpdate;
        } catch (error) { throw error }
    }

    async removeTugas(user: User, id: number) {
        try {
            if (user.role == Role.MAHASISWA) throw new NotFoundException('Anda tidak memiliki akses');
            const tugas = await this.prisma.tugas.findUnique({ where: { id: id }, });
            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');
            if (tugas.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'tugas', tugas.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const tugasDelete = await this.prisma.tugas.delete({ where: { id: id } });
            return tugasDelete;
        } catch (error) { throw error }
    }
}

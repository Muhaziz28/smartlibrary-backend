import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TugasService {
    constructor(private prisma: PrismaService) { }

    async getTugas(user: User, id: number, req: any) {
        try {
            const tugas = await this.prisma.tugas.findUnique({
                where: {
                    id: id,
                },
            })

            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');

            if (tugas.file != null) {
                tugas.file = `http://${req.headers.host}/public/tugas/${tugas.file}`;
            }

            return tugas;
        } catch (error) {
            throw error;
        }
    }

    async addTugas(data: any, id: number) {
        try {
            const tugasExist = await this.prisma.tugas.findFirst({
                where: {
                    pertemuanId: id,
                }
            });

            if (tugasExist) throw new NotFoundException('Tugas sudah ada');

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
        } catch (error) {
            throw error;
        }
    }

    async updateTugas(data: any, id: number) {
        try {
            const tugas = await this.prisma.tugas.findUnique({
                where: {
                    id: id,
                },
            });

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
                where: {
                    id: id,
                }
            });

            return tugasUpdate;
        } catch (error) {
            throw error;
        }
    }
}

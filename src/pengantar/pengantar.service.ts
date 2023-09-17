import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPengantarDto } from './dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PengantarService {
    constructor(private prisma: PrismaService) { }

    async addPengantar(data: any) {
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findUnique({
                where: {
                    id: data.sesiMataKuliahId,
                },
            });

            if (!sesiMataKuliah) {
                throw new NotFoundException('Sesi Mata Kuliah tidak ditemukan');
            }

            const pengantar = await this.prisma.pengantar.create({
                data: {
                    sesiMataKuliahId: data.sesiMataKuliahId,
                    link: data.link,
                    deskripsi: data.deskripsi,
                    file: data.file,
                },
                include: {
                    sesiMataKuliah: true,
                }
            });

            return pengantar;
        } catch (error) {
            throw error;
        }
    }

    async getPengantar(id: number, req: any) {
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findUnique({
                where: { id },
            });

            if (!sesiMataKuliah) {
                throw new NotFoundException('Sesi Mata Kuliah tidak ditemukan');
            }

            // Get data pengantar
            const pengantar = await this.prisma.pengantar.findFirst({
                where: { sesiMataKuliahId: id },
            });

            if (!pengantar) throw new NotFoundException('Pengantar tidak ditemukan');

            if (pengantar.file) {
                pengantar.file = `http://${req.headers.host}/public/pengantar/${pengantar.file}`;
            }


            return pengantar;
        } catch (error) {
            throw error;
        }
    }

    async updatePengantar(id: number, data: any) {
        try {
            const pengantar = await this.prisma.pengantar.findUnique({
                where: { id },
            })
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
                    link: data.link,
                    deskripsi: data.deskripsi,
                    file: data.file,
                },
                include: { sesiMataKuliah: true, }
            });

            return updatedPengantar;
        } catch (error) {
            throw error;
        }
    }
}

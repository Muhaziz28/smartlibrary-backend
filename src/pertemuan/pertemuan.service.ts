import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PertemuanDto } from './dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PertemuanService {
    constructor(private prisma: PrismaService) { }

    async getPertemuan(id: number, req: any) {
        try {
            const pertemuan = await this.prisma.pertemuan.findUnique({
                where: {
                    id: id,
                },
            });

            if (pertemuan.file) {
                pertemuan.file = `http://${req.headers.host}/public/pertemuan/${pertemuan.file}`;
            }

            return pertemuan;
        } catch (error) {
            return error;
        }
    }

    async updatePertemuan(data: any, id: number) {
        try {
            const checkPertemuan = await this.prisma.pertemuan.findUnique({
                where: {
                    id: id,
                },
            });

            if (checkPertemuan.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'pertemuan', checkPertemuan.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }

            const pertemuan = await this.prisma.pertemuan.update({
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

            return pertemuan;
        } catch (error) {
            throw error;
        }
    }
}

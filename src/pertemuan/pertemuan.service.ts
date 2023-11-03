import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PertemuanDto } from './dto';

@Injectable()
export class PertemuanService {
    constructor(private prisma: PrismaService) { }

    async getPertemuan(id: number, req: any) {
        try {
            const pertemuan = await this.prisma.pertemuan.findUnique({
                where: { id: id },
                include: { Tugas: true, BahanAjar: true }
            });
            if (!pertemuan) throw new NotFoundException('Pertemuan tidak ditemukan');
            if (pertemuan.BahanAjar.length > 0) {
                pertemuan.BahanAjar.map((bahanAjar) => {
                    if (bahanAjar.file != null) bahanAjar.file = `${req.protocol}://${req.headers.host}/public/bahan-ajar/${bahanAjar.file}`;
                    else bahanAjar.file = null;
                    return bahanAjar;
                });
            }
            if (pertemuan.Tugas.length > 0) {
                pertemuan.Tugas.map((tugas) => {
                    if (tugas.file != null) tugas.file = `${req.protocol}://${req.headers.host}/public/tugas/${tugas.file}`;
                    else tugas.file = null;
                    return tugas;
                });
            }
            return pertemuan;
        } catch (error) { return error }
    }

    async updatePertemuan(dto: PertemuanDto, id: number) {
        try {
            const checkPertemuan = await this.prisma.pertemuan.findUnique({ where: { id: id } });
            if (!checkPertemuan) throw new NotFoundException('Pertemuan tidak ditemukan');
            const pertemuan = await this.prisma.pertemuan.update({
                data: {
                    tanggalPertemuan: dto.tanggalPertemuan,
                },
                where: { id: id },
                include: { Tugas: true, BahanAjar: true }
            });
            return pertemuan;
        } catch (error) { throw error }
    }
}

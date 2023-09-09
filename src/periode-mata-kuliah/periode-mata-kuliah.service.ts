import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPeriodeMataKuliahDto } from './dto';

@Injectable()
export class PeriodeMataKuliahService {
    constructor(private prisma: PrismaService) { }

    async getMataKuliahPeriode(query: { periodeId?: number, page?: number, limit?: number, search?: string }) {
        try {
            const { periodeId, page = 1, limit = 10, search = '' } = query;
            const periodeParsed = periodeId != null ? parseInt(periodeId.toString()) : null;
            const pageParsed = parseInt(page.toString());
            const limitParsed = parseInt(limit.toString());

            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true },
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            let mataKuliahPeriode: any;
            let totalPage: any;
            let offset: any;
            let mataKuliahPeriodeCount: any;
            if (periodeId === null || periodeId === undefined) {
                // hitung total data mata kuliah periode
                mataKuliahPeriodeCount = await this.prisma.periodeMataKuliah.count({
                    where: { periodeId: periodeAktif.id, mataKuliah: { namaMataKuliah: { contains: search } } },
                })

                // hitung total halaman
                totalPage = Math.ceil(mataKuliahPeriodeCount / limitParsed);

                // hitung offset
                offset = (pageParsed - 1) * limitParsed;

                mataKuliahPeriode = await this.prisma.periodeMataKuliah.findMany({
                    where: { periodeId: periodeAktif.id, mataKuliah: { namaMataKuliah: { contains: search } } },
                    include: {
                        mataKuliah: { include: { prodi: { include: { fakultas: true } } } },
                        periode: true,
                    },
                    skip: offset,
                    take: limitParsed,
                })
            } else {
                mataKuliahPeriodeCount = await this.prisma.periodeMataKuliah.count({
                    where: { periodeId: periodeParsed, mataKuliah: { namaMataKuliah: { contains: search } } },
                })

                // hitung total halaman
                totalPage = Math.ceil(mataKuliahPeriodeCount / limitParsed);

                // hitung offset
                offset = (pageParsed - 1) * limitParsed;

                mataKuliahPeriode = await this.prisma.periodeMataKuliah.findMany({
                    where: { periodeId: parseInt(periodeId.toString()) },
                    include: {
                        mataKuliah: { include: { prodi: { include: { fakultas: true } } } },
                        periode: true,
                    },
                    skip: offset,
                    take: limitParsed,
                })
            }

            return { data: mataKuliahPeriode, totalPage, page: pageParsed, limit: limitParsed, totalData: mataKuliahPeriodeCount }
        } catch (error) {
            throw error;
        }
    }

    async addMataKuliahPeriode(dto: AddPeriodeMataKuliahDto) {
        try {
            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true }
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            const mataKuliah = await this.prisma.mataKuliah.findMany({
                where: { id: { in: dto.mataKuliahId } }
            })

            if (mataKuliah.length !== dto.mataKuliahId.length) throw new NotFoundException('Mata kuliah tidak ditemukan')

            const mataKuliahPeriode = await this.prisma.periodeMataKuliah.createMany({
                data: dto.mataKuliahId.map((id) => ({
                    periodeId: periodeAktif.id,
                    mataKuliahId: id
                }))
            })

            return mataKuliahPeriode;
        } catch (error) {
            throw error;
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPeriodeMataKuliahDto } from './dto';

@Injectable()
export class PeriodeMataKuliahService {
    constructor(private prisma: PrismaService) { }

    async getMataKuliahPeriode(query: { periodeId: number }) {
        try {

            const { periodeId } = query;

            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true },
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            let mataKuliahPeriode: any;
            if (periodeId === null || periodeId === undefined) {
                mataKuliahPeriode = await this.prisma.periodeMataKuliah.findMany({
                    where: { periodeId: periodeAktif.id },
                    include: {
                        mataKuliah: { include: { prodi: { include: { fakultas: true } } } },
                        periode: true,
                    }
                })
            } else {
                mataKuliahPeriode = await this.prisma.periodeMataKuliah.findMany({
                    where: { periodeId: parseInt(periodeId.toString()) },
                    include: {
                        mataKuliah: { include: { prodi: { include: { fakultas: true } } } },
                        periode: true,
                    }
                })
            }

            return mataKuliahPeriode;
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSesiMataKuliahDto } from './dto';

@Injectable()
export class SesiMataKuliahService {
    constructor(private prisma: PrismaService) { }

    async getSesiMataKuliah(query: { search?: string }, req: any) {
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findMany({
                where: { kodeSesi: { contains: query.search } },
                include: {
                    periodeMataKuliah: {
                        include: {
                            SesiMataKuliah: {
                                include: { Pengantar: true, Pertemuan: true }
                            },
                            mataKuliah: { include: { prodi: true } }
                        }
                    },
                    dosen: { include: { fakultas: true } }
                }
            });

            const response = sesiMataKuliah.map((sesi) => {


                // Mengubah properti file dalam Pengantar
                sesi.periodeMataKuliah.SesiMataKuliah.forEach((periode) => {
                    periode.Pengantar.forEach((sesiMataKuliahItem) => {
                        sesiMataKuliahItem.file = `http://${req.headers.host}/public/pengantar/${sesiMataKuliahItem.file}`;
                    });
                });

                return {
                    ...sesi,
                };
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    async addSesiMataKuliah(dto: AddSesiMataKuliahDto) {
        try {
            const periodeMataKuliah = await this.prisma.periodeMataKuliah.findUnique({
                where: { id: dto.periodeMataKuliahId },
            });
            if (!periodeMataKuliah) throw new NotFoundException('Periode mata kuliah tidak ditemukan');

            const nipDosenOnSesiMataKuliahExist = await this.prisma.sesiMataKuliah.findFirst({
                where: { nip: dto.nip, periodeMataKuliahId: dto.periodeMataKuliahId },
            });
            if (nipDosenOnSesiMataKuliahExist) throw new NotFoundException('NIP dosen sudah terdaftar pada periode mata kuliah ini');

            const kodeSesiExist = await this.prisma.sesiMataKuliah.findFirst({
                where: { kodeSesi: dto.kodeSesi, periodeMataKuliahId: dto.periodeMataKuliahId },
            });
            if (kodeSesiExist) throw new NotFoundException('Kode sesi sudah terdaftar pada periode mata kuliah ini');

            const pertemuanDefault = new Array(16).fill({}).map((_, index) => ({
                pertemuanKe: index + 1
            }))

            const sesiMataKuliah = await this.prisma.sesiMataKuliah.create({
                data: {
                    nip: dto.nip,
                    periodeMataKuliahId: dto.periodeMataKuliahId,
                    kodeSesi: dto.kodeSesi,
                    jadwal: dto.jadwal,
                    Pertemuan: {
                        createMany: {
                            data: pertemuanDefault,
                            skipDuplicates: true,
                        }
                    }
                },
                include: {
                    Pertemuan: true,
                }
            })

            return sesiMataKuliah;
        } catch (error) {
            throw error;
        }
    }
}

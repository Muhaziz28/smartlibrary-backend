import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSesiMataKuliahDto } from './dto';
import { User } from '@prisma/client';

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
                // Mengubah properti file dalam Pengantar jika pengantar tidak null
                sesi.periodeMataKuliah.SesiMataKuliah.forEach((periode) => {
                    if (periode.Pengantar !== null) {
                        if (periode.Pengantar.file !== null) {
                            periode.Pengantar.file = `http://${req.headers.host}/public/pengantar/${periode.Pengantar.file}`;
                        } else {
                            periode.Pengantar.file = null;
                        }
                    }
                });
                return { ...sesi, };
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSesiMataKuliahDosen(query: { search?: string }, req: any, user: User) {
        console.log(user.username);
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findMany({
                where: { kodeSesi: { contains: query.search }, nip: user.username },
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
                    if (periode.Pengantar !== null) {
                        if (periode.Pengantar.file !== null) {
                            periode.Pengantar.file = `http://${req.headers.host}/public/pengantar/${periode.Pengantar.file}`;
                        } else {
                            periode.Pengantar.file = null;
                        }
                    }
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

    async getSesiMataKuliahById(id: number, req: any) {
        try {
            const checkSesi = await this.prisma.sesiMataKuliah.findUnique({
                where: { id },
            })
            if (!checkSesi) throw new NotFoundException('Sesi Mata Kuliah tidak ditemukan');
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findUnique({
                where: { id },
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

            // Mengubah properti file dalam Pengantar
            sesiMataKuliah.periodeMataKuliah.SesiMataKuliah.forEach((periode) => {
                if (periode.Pengantar !== null) {
                    if (periode.Pengantar.file !== null) {
                        periode.Pengantar.file = `http://${req.headers.host}/public/pengantar/${periode.Pengantar.file}`;
                    } else {
                        periode.Pengantar.file = null;
                    }
                }
            });

            return sesiMataKuliah;
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

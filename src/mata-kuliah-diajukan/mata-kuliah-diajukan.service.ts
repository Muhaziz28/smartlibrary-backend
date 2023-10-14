import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User, statusMataKuliahDiajukan } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMataKuliahDiajukanDto, KonfirmasiMataKuliahDiajukanDto } from './dto';

@Injectable()
export class MataKuliahDiajukanService {
    constructor(private prisma: PrismaService) { }

    async getMataKuliahDiajukan(user: User) {
        try {
            if (user.role !== Role.MAHASISWA) throw new NotFoundException('Anda bukan mahasiswa')
            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true }
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            const mataKuliahDiajukan = await this.prisma.mataKuliahDiajukan.findMany({
                where: {
                    sesiMataKuliah: {
                        periodeMataKuliah: {
                            periode: {
                                isActive: true
                            }
                        }
                    },
                    nim: user.username,
                },
                include: {
                    sesiMataKuliah: {
                        include: {
                            periodeMataKuliah: {
                                include: {
                                    periode: true,
                                }
                            },
                        }
                    }
                    // mahasiswa: true,
                }
            })

            return mataKuliahDiajukan;
        } catch (error) {
            throw error;
        }
    }

    async addMataKuliahDiajukan(dto: AddMataKuliahDiajukanDto, user: User) {
        try {
            if (user.role !== Role.MAHASISWA) throw new NotFoundException('Anda bukan mahasiswa')
            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true }
            })

            const added = await this.prisma.mataKuliahDiajukan.findMany({
                where: {
                    sesiMataKuliahId: {
                        in: dto.sesiMataKuliahId,
                    },
                    nim: user.username,
                    sesiMataKuliah: {
                        periodeMataKuliah: {
                            periodeId: periodeAktif.id,
                        }
                    }
                },
                include: {
                    sesiMataKuliah: {
                        include: {
                            periodeMataKuliah: {
                                include: {
                                    periode: true,
                                }
                            }
                        }
                    }
                }
            })

            if (added.length > 0) throw new NotFoundException('Sesi mata kuliah sudah diambil')

            const mataKuliahDiajukan = await this.prisma.mataKuliahDiajukan.createMany({
                data: dto.sesiMataKuliahId.map((sesiMataKuliahId) => ({
                    sesiMataKuliahId,
                    nim: user.username,
                }))
            })

            return mataKuliahDiajukan
        } catch (error) {
            throw error;
        }
    }

    async getPengajuanMataKuliahMahasiswa(user: User) {
        try {
            if (user.role !== Role.DOSEN) throw new NotFoundException('Anda bukan dosen')
            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true }
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            const mataKuliahDiajukan = await this.prisma.mataKuliahDiajukan.findMany({
                where: {
                    sesiMataKuliah: {
                        periodeMataKuliah: {
                            periode: {
                                isActive: true
                            }
                        },
                        nip: user.username,
                    },
                    status: statusMataKuliahDiajukan.pending
                },
                include: {
                    sesiMataKuliah: { include: { periodeMataKuliah: { include: { periode: true, } }, } }
                }
            })

            return mataKuliahDiajukan;
        } catch (error) {
            throw error;
        }
    }

    async konfirmasiPengajuanMataKuliahMahasiswa(id: number, user: User, dto: KonfirmasiMataKuliahDiajukanDto) {
        try {
            if (user.role !== Role.DOSEN) throw new NotFoundException('Anda bukan dosen')

            const mataKuliahDiajukanCheck = await this.prisma.mataKuliahDiajukan.findFirst({
                where: { id },
                include: { sesiMataKuliah: true }
            })

            console.log('iD', id)

            if (!mataKuliahDiajukanCheck) throw new NotFoundException('Mata kuliah diajukan tidak ditemukan')

            const periodeAktif = await this.prisma.periode.findFirst({
                where: { isActive: true }
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            const mataKuliahDiajukan = await this.prisma.mataKuliahDiajukan.update({
                where: { id },
                data: { status: statusMataKuliahDiajukan[dto.status] }
            })

            if (mataKuliahDiajukan.status === statusMataKuliahDiajukan.diterima) {
                const mataKuliahDiambil = await this.prisma.mataKuliahDiambil.create({
                    data: {
                        sesiMataKuliahId: mataKuliahDiajukan.sesiMataKuliahId,
                        nim: mataKuliahDiajukan.nim,
                    }
                });
            }

            return mataKuliahDiajukan;
        } catch (error) {
            throw error;
        }
    }
}

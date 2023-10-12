import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMataKuliahDiajukanDto } from './dto';

@Injectable()
export class MataKuliahDiajukanService {
    constructor(private prisma: PrismaService) { }

    async getMataKuliahDiajukan(user: User) {
        try {
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
                    sesiMataKuliah: true,
                    mahasiswa: true,
                }
            })

            return mataKuliahDiajukan;
        } catch (error) {
            throw error;
        }
    }

    async addMataKuliahDiajukan(dto: AddMataKuliahDiajukanDto, user: User) {
        try {
            // cek apakah sesi mata kuliah sudah diambil
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
}

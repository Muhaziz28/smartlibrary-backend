import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MataKuliahDiambilService {
    constructor(private prisma: PrismaService) { }

    async mataKuliahDiambil(user: User) {
        try {
            const userIsmahasiswa = await this.prisma.mahasiswa.findFirst({
                where: {
                    nim: user.username
                }
            })
            if (!userIsmahasiswa) throw new NotFoundException('Anda bukan mahasiswa')

            const periodeAktif = await this.prisma.periode.findFirst({
                where: {
                    isActive: true,
                }
            })

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif')

            const mataKuliahDiambil = await this.prisma.mataKuliahDiambil.findMany({
                where: {
                    sesiMataKuliah: {
                        periodeMataKuliah: {
                            periode: {
                                isActive: true
                            }
                        }
                    }
                },
                include: {
                    sesiMataKuliah: true,
                    mahasiswa: true,
                }
            })

            return mataKuliahDiambil
        } catch (error) {
            throw error;
        }
    }
}

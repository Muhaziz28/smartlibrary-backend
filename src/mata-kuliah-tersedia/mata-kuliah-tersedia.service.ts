import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MataKuliahTersediaService {
    constructor(private prisma: PrismaService) { }

    async getListMataKuliahTersedia(user: User) {
        try {
            const userMahasiswa = await this.prisma.user.findFirst({
                where: {
                    username: user.username,
                }
            })
            if (userMahasiswa.role !== 'MAHASISWA') throw new NotFoundException('Anda bukan mahasiswa');

            const periodeAktif = await this.prisma.periode.findFirst({
                where: {
                    isActive: true,
                }
            });

            if (!periodeAktif) throw new NotFoundException('Tidak ada periode aktif');

            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findMany({
                where: {
                    periodeMataKuliah: {
                        periodeId: periodeAktif.id,
                    },
                    MataKuliahDiambil: {
                        none: {
                            nim: userMahasiswa.username,
                        }
                    }
                },
                include: {
                    periodeMataKuliah: {
                        include: {
                            mataKuliah: true,
                            periode: true,
                        }
                    }
                }
            });

            return sesiMataKuliah;
        } catch (error) {
            throw error;
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MataKuliahDiambilService {
    constructor(private prisma: PrismaService) { }

    async mataKuliahDiambil() {
        try {
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

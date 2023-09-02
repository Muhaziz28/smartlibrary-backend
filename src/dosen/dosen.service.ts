import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DosenService {
    constructor(private prisma: PrismaService) { }

    async getAllDosen(params: { page?: number, limit?: number, search?: string }) {
        try {
            const { page = 1, limit = 10, search = '' } = params;
            const dosen = await this.prisma.dosen.findMany({
                where: { OR: [{ nip: { contains: search } }, { nama: { contains: search } }] },
                skip: (page - 1) * limit,
                take: limit
            });
            const total = await this.prisma.dosen.count({
                where: { OR: [{ nip: { contains: search } }, { nama: { contains: search } }] }
            });
            if (!dosen.length) {
                throw new ForbiddenException('Data tidak ditemukan');
            }
            return {
                data: dosen,
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        }
        catch (error) {
            throw error;
        }
    }

    // async addDosen(dto: ) {
    //     try {
    //         const mahasiswa = await this.prisma.mahasiswa.create({
    //             data: {
    //                 nim: dto.nim,
    //                 nama: dto.nama,
    //                 email: dto.email,
    //                 usernameTelegram: dto.usernameTelegram,
    //                 noTelp: dto.noTelp
    //             }
    //         });
    //         return mahasiswa;
    //     }
    //     catch (error) {
    //         if (error instanceof PrismaClientKnownRequestError) {
    //             if (error.code === 'P2002') {
    //                 throw new ForbiddenException('NIM sudah terdaftar');
    //             }
    //         }
    //         throw error;
    //     }
    // }
}

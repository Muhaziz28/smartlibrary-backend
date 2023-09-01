import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MahasiswaDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MahasiswaService {
    constructor(private prisma: PrismaService) { }

    async addMahasiswa(dto: MahasiswaDto) {
        try {
            const mahasiswa = await this.prisma.mahasiswa.create({
                data: {
                    nim: dto.nim,
                    nama: dto.nama,
                    email: dto.email,
                    usernameTelegram: dto.usernameTelegram,
                    noTelp: dto.noTelp
                }
            });
            return mahasiswa;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('NIM sudah terdaftar');
                }
            }
            throw error;
        }
    }

    async getAllMahasiswa() {
        try {
            const mahasiswa = await this.prisma.mahasiswa.findMany();
            return mahasiswa;
        } catch (error) {
            throw error;
        }
    }
}

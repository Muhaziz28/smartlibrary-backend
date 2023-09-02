import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MahasiswaDto, UpdateMahasiswaDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MahasiswaService {
    constructor(private prisma: PrismaService) { }

    async addMahasiswa(dto: MahasiswaDto) {
        try {
            const checkMahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim: dto.nim }
            });
            if (checkMahasiswa) { throw new ConflictException('NIM sudah terdaftar'); }

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
                    throw new ConflictException('NIM sudah terdaftar');
                }
            }
            throw error;
        }
    }

    async getAllMahasiswa(params: { page?: number, limit?: number, search?: string }) {
        try {
            const { page = 1, limit = 10, search = '' } = params;
            const mahasiswa = await this.prisma.mahasiswa.findMany({
                where: { OR: [{ nim: { contains: search } }, { nama: { contains: search } }] },
                skip: (page - 1) * limit,
                take: limit
            });
            const total = await this.prisma.mahasiswa.count({
                where: { OR: [{ nim: { contains: search } }, { nama: { contains: search } }] }
            });
            if (!mahasiswa.length) {
                throw new NotFoundException('Data tidak ditemukan');
            }
            return {
                data: mahasiswa,
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        }
        catch (error) {
            throw error;
        }
    }

    async getMahasiswaByNim(nim: string) {
        try {
            const mahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim }
            });

            if (!mahasiswa) { throw new NotFoundException('NIM tidak ditemukan'); }

            return mahasiswa;
        }
        catch (error) {
            throw error;
        }
    }

    async updateMahasiswa(nim: string, dto: UpdateMahasiswaDto) {
        try {
            const mahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim }
            })
            if (!mahasiswa) { throw new NotFoundException('NIM tidak ditemukan'); }

            const updateMahasiswa = await this.prisma.mahasiswa.update({
                where: { nim },
                data: {
                    nama: dto.nama,
                    email: dto.email,
                    usernameTelegram: dto.usernameTelegram,
                    noTelp: dto.noTelp
                }
            })
            return updateMahasiswa;
        } catch (error) {
            throw error;
        }
    }

    async deleteMahasiswa(nim: string) {
        try {
            const mahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim } })
            if (!mahasiswa) { throw new NotFoundException('NIM tidak ditemukan'); }

            const deleteMahasiswa = await this.prisma.mahasiswa.delete({
                where: { nim }
            })
            return deleteMahasiswa;
        } catch (error) {
            throw error;
        }
    }
}

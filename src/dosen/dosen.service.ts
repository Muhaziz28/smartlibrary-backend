import { ForbiddenException, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDosenDto, UpdateDosenDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from "argon2";
import * as brcypt from "bcrypt";
import { Role } from '@prisma/client';

@Injectable()
export class DosenService {
    constructor(private prisma: PrismaService) { }

    async getAllDosen(params: { page?: number, limit?: number, search?: string, }) {
        try {
            const { page = 1, limit = 10, search = '' } = params;
            const parseLimit = parseInt(limit.toString());
            const dosen = await this.prisma.dosen.findMany({
                where: { OR: [{ nip: { contains: search } }, { nama: { contains: search } }] },
                include: { fakultas: true },
                skip: (page - 1) * limit,
                take: parseLimit,
            });
            const total = await this.prisma.dosen.count({
                where: { OR: [{ nip: { contains: search } }, { nama: { contains: search } }] }
            });
            if (!dosen.length) throw new ForbiddenException('Data tidak ditemukan');
            return {
                data: dosen,
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        }
        catch (error) { throw error }
    }

    async getDosenByNip(nip: string) {
        try {
            const dosen = await this.prisma.dosen.findUnique({ where: { nip: nip } })
            if (!dosen) { throw new NotFoundException('Data tidak ditemukan'); }
            return dosen;
        } catch (error) { throw error; }
    }

    async addDosen(dto: CreateDosenDto) {
        try {
            const nipDosen = await this.prisma.dosen.findUnique({ where: { nip: dto.nip } })
            if (nipDosen) throw new ForbiddenException('NIP sudah terdaftar');
            const emailDosen = await this.prisma.dosen.findUnique({ where: { email: dto.email } })
            if (emailDosen) { throw new ForbiddenException('Email sudah terdaftar'); }
            const noTelpDosen = await this.prisma.dosen.findUnique({ where: { noTelp: dto.noTelp } })
            if (noTelpDosen) { throw new ForbiddenException('No Telp sudah terdaftar'); }
            const fakultas = await this.prisma.fakultas.findUnique({
                where: { id: dto.fakultasId }
            })
            if (!fakultas) { throw new NotFoundException('Fakultas tidak ditemukan'); }
            const dosen = await this.prisma.dosen.create({
                data: {
                    nip: dto.nip,
                    nama: dto.nama,
                    email: dto.email,
                    usernameTelegram: dto.usernameTelegram,
                    noTelp: dto.noTelp,
                    fakultasId: dto.fakultasId
                }
            });
            const hashPassword = await brcypt.hash(dto.nip, 10);
            const user = await this.prisma.user.create({
                data: {
                    username: dto.nip,
                    password: hashPassword,
                    role: Role.DOSEN,
                    prodiId: null,
                }
            })
            return dosen;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) if (error.code === 'P2002') throw new ForbiddenException('NIP sudah terdaftar');
            throw error;
        }
    }

    async updateDosen(nip: string, dto: UpdateDosenDto) {
        try {
            const findDosenData = await this.prisma.dosen.findUnique({
                where: { nip: nip }
            })
            if (!findDosenData) { throw new NotFoundException('Data tidak ditemukan'); }
            const dosen = await this.prisma.dosen.update({
                where: { nip: nip },
                data: {
                    nama: dto.nama,
                    email: dto.email,
                    usernameTelegram: dto.usernameTelegram,
                    noTelp: dto.noTelp,
                    fakultasId: dto.fakultasId
                }
            });
            return dosen
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) if (error.code === 'P2002') throw new ForbiddenException('NIP sudah terdaftar');
            throw error;
        }
    }

    async deleteDosen(nip: string) {
        try {
            const findDosenData = await this.prisma.dosen.findUnique({
                where: { nip: nip }
            })
            if (!findDosenData) { throw new NotFoundException('Data tidak ditemukan'); }
            const dosen = await this.prisma.dosen.delete({
                where: { nip: nip }
            });
            return dosen
        } catch (error) { throw error }
    }
}

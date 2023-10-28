import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdiDto } from './dto/create-prodi.dto';
import { UpdateProdiDto } from './dto/update-prodi.dto';

@Injectable()
export class ProdiService {
    constructor(private prisma: PrismaService) { }

    async addProdi(dto: CreateProdiDto) {
        try {
            const checkProdi = await this.prisma.prodi.findFirst({ where: { namaProdi: dto.namaProdi } })
            if (checkProdi) { throw new ConflictException('Nama Prodi sudah terdaftar'); }
            const prodi = await this.prisma.prodi.create({
                data: {
                    namaProdi: dto.namaProdi,
                    singkatan: dto.singkatan,
                    fakultasId: dto.fakultasId
                }
            })
            return prodi;
        } catch (error) { throw error }
    }

    async updateProdi(params: { id: number }, dto: UpdateProdiDto) {
        try {
            const checkProdi = await this.prisma.prodi.findUnique({ where: { id: params.id } })
            if (!checkProdi) { throw new NotFoundException('Prodi tidak ditemukan'); }
            const checkFakultas = await this.prisma.fakultas.findUnique({ where: { id: dto.fakultasId } })
            if (!checkFakultas) { throw new NotFoundException('Fakultas tidak ditemukan'); }
            const prodi = await this.prisma.prodi.update({
                where: { id: params.id },
                data: {
                    namaProdi: dto.namaProdi,
                    singkatan: dto.singkatan,
                    fakultasId: dto.fakultasId
                }
            })
            return prodi;
        } catch (error) { throw error }
    }

    async getProdi(params: { search?: string }) {
        try {
            const { search = '' } = params;
            const prodi = await this.prisma.prodi.findMany({
                where: { OR: [{ namaProdi: { contains: search } }, { singkatan: { contains: search } }] },
                include: { fakultas: true, }
            })
            if (!prodi.length) { throw new NotFoundException('Data tidak ditemukan'); }
            return prodi;
        }
        catch (error) { throw error }
    }

    async getProdiById(id: number) {
        try {
            const prodi = await this.prisma.prodi.findUnique({
                where: { id: id },
                include: { fakultas: true }
            });
            if (!prodi) { throw new NotFoundException('Data tidak ditemukan'); }
            return prodi;
        }
        catch (error) { throw error }
    }

    async deleteProdi(id: number) {
        try {
            const cekProdi = await this.prisma.prodi.findUnique({ where: { id: id } })
            if (!cekProdi) { throw new NotFoundException('Data tidak ditemukan') }
            const prodi = await this.prisma.prodi.delete({ where: { id: id } });
            return prodi;
        } catch (error) { throw error }
    }
}

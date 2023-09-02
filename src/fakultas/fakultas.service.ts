import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFakultasDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';

@Injectable()
export class FakultasService {
    constructor(private prisma: PrismaService) { }

    async addFakultas(dto: CreateFakultasDto) {
        try {
            // check if namaFakultas already exists
            const checkFakultas = await this.prisma.fakultas.findUnique({
                where: { namaFakultas: dto.namaFakultas }
            });
            if (checkFakultas) { throw new ForbiddenException('Nama Fakultas sudah terdaftar'); }


            const fakultas = await this.prisma.fakultas.create({
                data: {
                    namaFakultas: dto.namaFakultas,
                    singkatan: dto.singkatan,
                }
            })
            return fakultas;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { throw new ForbiddenException('Nama Fakultas sudah terdaftar'); }
            }
            throw error;
        }
    }

    async getFakultas(params: { search?: string }) {
        try {
            const { search = '' } = params;
            const fakultas = await this.prisma.fakultas.findMany({
                where: { OR: [{ namaFakultas: { contains: search } }, { singkatan: { contains: search } }] },
            });
            if (!fakultas.length) { throw new ForbiddenException('Data tidak ditemukan'); }
            return fakultas
        }
        catch (error) {
            throw error;
        }
    }

    async getFakultasById(id: number) {
        try {
            const fakultas = await this.prisma.fakultas.findUnique({
                where: { id: id }
            });
            if (!fakultas) { throw new ForbiddenException('Data tidak ditemukan'); }
            return fakultas;
        }
        catch (error) {
            throw error;
        }
    }

    async updateFakultas(id: number, dto: UpdateFakultasDto) {
        try {
            // check if namaFakultas already exists
            const checkFakultas = await this.prisma.fakultas.findUnique({
                where: { namaFakultas: dto.namaFakultas }
            });
            if (checkFakultas) { throw new ForbiddenException('Nama Fakultas sudah terdaftar'); }

            const fakultas = await this.prisma.fakultas.update({
                where: { id: id },
                data: { namaFakultas: dto.namaFakultas, singkatan: dto.singkatan, }
            });
            return fakultas;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { throw new ForbiddenException('Nama Fakultas sudah terdaftar'); }
            }
            throw error;
        }
    }

    async deleteFakultas(id: number) {
        try {
            const fakultas = await this.prisma.fakultas.delete({
                where: { id: id }
            });
            return fakultas;
        }
        catch (error) {
            throw error;
        }
    }
}

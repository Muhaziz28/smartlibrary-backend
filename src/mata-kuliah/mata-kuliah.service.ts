import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMataKuliahDto, UpdateMataKuliahDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MataKuliahService {
    constructor(private prisma: PrismaService) { }

    async addMataKuliah(dto: CreateMataKuliahDto) {
        try {
            const prodiCheck = await this.prisma.prodi.findUnique({
                where: { id: dto.prodiId },
                include: { fakultas: true }
            })
            if (!prodiCheck) throw new NotFoundException('Prodi tidak ditemukan');
            const result = await this.prisma.mataKuliah.create({
                data: {
                    kodeMataKuliah: dto.kodeMataKuliah,
                    namaMataKuliah: dto.namaMataKuliah,
                    sks: dto.sks,
                    prodiId: dto.prodiId
                }
            });
            return result;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') throw new ConflictException('Kode Mata Kuliah sudah digunakan');
            }
            throw error;
        }
    }

    async getMataKuliah(params: { search?: string }) {
        try {
            const { search = '' } = params;
            const mataKuliah = await this.prisma.mataKuliah.findMany({
                where: { OR: [{ namaMataKuliah: { contains: search } }, { kodeMataKuliah: { contains: search } }] },
                include: { prodi: true, }
            })
            if (!mataKuliah.length) { throw new NotFoundException('Data tidak ditemukan'); }
            return mataKuliah;
        } catch (error) {
            throw error;
        }
    }

    async updateMataKuliah(params: { id: number }, dto: UpdateMataKuliahDto) {
        try {
            const matakuliah = await this.prisma.mataKuliah.findFirst({ where: { id: params.id } })
            if (!matakuliah) throw new NotFoundException('Mata Kuliah tidak ditemukan');
            let updateMataKuliah: any;
            if (matakuliah.kodeMataKuliah !== dto.kodeMataKuliah) {
                const checkKodeMataKuliah = await this.prisma.mataKuliah.findFirst({
                    where: { kodeMataKuliah: dto.kodeMataKuliah }
                })
                if (checkKodeMataKuliah) { throw new ConflictException('Kode Mata Kuliah sudah digunakan'); }
                updateMataKuliah = await this.prisma.mataKuliah.update({
                    where: { id: params.id },
                    data: {
                        kodeMataKuliah: dto.kodeMataKuliah,
                        namaMataKuliah: dto.namaMataKuliah,
                        sks: dto.sks,
                        prodiId: dto.prodiId
                    }
                })
            } else {
                updateMataKuliah = await this.prisma.mataKuliah.update({
                    where: { id: params.id },
                    data: {
                        namaMataKuliah: dto.namaMataKuliah,
                        sks: dto.sks,
                        prodiId: dto.prodiId
                    }
                })
            }
            return updateMataKuliah;
        } catch (error) { throw error }
    }
}

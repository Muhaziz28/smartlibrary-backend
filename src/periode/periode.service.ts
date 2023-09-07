import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeriodeDto, UpdatePeriodeDto } from './dto';

@Injectable()
export class PeriodeService {
    constructor(private prisma: PrismaService) { }

    async getAllPeriode(params: { page?: number, limit?: number, search?: string }) {
        try {
            const { page = 1, limit = 10, search = '' } = params;
            const parseLimit = parseInt(limit.toString());
            const periode = await this.prisma.periode.findMany({
                where: { OR: [{ mulai: { contains: search } }, { selesai: { contains: search } }] },
            })
            const total = await this.prisma.periode.count({
                where: { OR: [{ mulai: { contains: search } }, { selesai: { contains: search } }] }
            });
            if (!periode.length) {
                throw new NotFoundException('Data tidak ditemukan');
            }
            return {
                data: periode,
                total,
                page,
                last_page: Math.ceil(total / limit)
            }

        } catch (error) {
            throw error;
        }
    }

    async addPeriode(dto: CreatePeriodeDto) {
        try {
            const checkPeriodeActive = await this.prisma.periode.findFirst({
                where: { isActive: true }
            })
            if (checkPeriodeActive) {
                await this.prisma.periode.update({
                    where: { id: checkPeriodeActive.id },
                    data: { isActive: false }
                })
            }
            const periode = await this.prisma.periode.create({
                data: {
                    mulai: dto.mulai,
                    selesai: dto.selesai,
                    isActive: true
                }
            })

            return periode;
        } catch (error) {
            throw error;
        }
    }

    async updatePeriode(id: number, dto: UpdatePeriodeDto) {
        try {
            const periode = await this.prisma.periode.findUnique({
                where: { id: id }
            })
            if (!periode) { throw new NotFoundException('Periode tidak ditemukan'); }

            const updatePeriode = await this.prisma.periode.update({
                where: { id: id },
                data: {
                    mulai: dto.mulai,
                    selesai: dto.selesai,
                }
            })

            return updatePeriode;
        } catch (error) {
            throw error;
        }
    }
}

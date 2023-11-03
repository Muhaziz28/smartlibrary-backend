import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddGroupDto } from './dto';

@Injectable()
export class GroupService {
    constructor(private prisma: PrismaService) { }

    async addGroup(dto: AddGroupDto, pengantarId: number) {
        try {
            const pengantar = await this.prisma.pengantar.findUnique({
                where: { id: pengantarId }
            })
            if (!pengantar) throw new NotFoundException('Pengantar tidak ditemukan')
            const group = await this.prisma.group.create({
                data: {
                    deskripsi: dto.deskripsi,
                    link: dto.link,
                    pengantar: { connect: { id: pengantarId } }
                }
            })
            return group;
        } catch (error) { throw error }
    }

    async updateGroup(dto: AddGroupDto, id: number) {
        try {
            const group = await this.prisma.group.findUnique({
                where: { id: id }
            })
            if (!group) throw new NotFoundException('Group tidak ditemukan')
            const groupUpdate = await this.prisma.group.update({
                where: { id: id },
                data: {
                    deskripsi: dto.deskripsi,
                    link: dto.link,
                }
            })
            return groupUpdate;
        } catch (error) { throw error }
    }

    async deleteGroup(id: number) {
        try {
            const group = await this.prisma.group.findUnique({
                where: { id: id }
            })
            if (!group) throw new NotFoundException('Group tidak ditemukan')
            const groupDelete = await this.prisma.group.delete({
                where: { id: id }
            })
            return groupDelete;
        } catch (error) { throw error }
    }
}

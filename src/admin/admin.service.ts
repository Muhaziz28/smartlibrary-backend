import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto';
import { Role } from '@prisma/client';
import * as argon from "argon2";

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async addAdmin(dto: CreateAdminDto) {
        try {
            const hashPassword = await argon.hash(dto.password);
            const admin = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    password: hashPassword,
                    role: Role.ADMIN,
                }
            });
            return admin;
        } catch (error) {
            throw error;
        }
    }
}

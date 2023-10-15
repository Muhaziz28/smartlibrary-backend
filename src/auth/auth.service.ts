import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto, NimDto } from "./dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConfigService } from "@nestjs/config";
import { Role } from "@prisma/client";
import { json } from "express";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async getNim(dto: NimDto) {
        console.log(dto.nim)
        console.log(typeof dto.nim)
        try {
            const nimMahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim: dto.nim },
            })
            if (!nimMahasiswa) {
                throw new NotFoundException('NIM tidak ditemukan');
            }

            const nimOnUser = await this.prisma.user.findUnique({
                where: { username: dto.nim }
            })
            if (nimOnUser) {
                throw new ForbiddenException('NIM tidak dapat digunakan');
            }

            return nimMahasiswa;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Username sudah digunakan');
                }
            }
            throw error;
        }
    }

    async signupMahasiswa(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        // save user to db
        try {
            const mahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim: dto.username },
            })
            if (!mahasiswa) { throw new NotFoundException('NIM tidak ditemukan'); }

            const prodi = await this.prisma.prodi.findUnique({
                where: { id: dto.prodiId }
            })
            if (!prodi) { throw new NotFoundException('Prodi tidak ditemukan'); }

            if (dto.password !== dto.passwordConfirmation) {
                throw new Error('Password tidak sama');
            }
            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    role: 'MAHASISWA',
                    password: hash,
                }
            })

            // return this.singToken(user.id, user.username, user.role);
            const token = await this.singToken(user.id, user.username, user.role);
            // Password tidak disertakan pada response
            delete user.password;

            return {
                ...token, user: user,
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Username sudah digunakan');
                }
            }
            throw error;
        }
    }

    async login(dto: LoginDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username: dto.username }
            })

            // Jika data user tidak ditemukan
            if (!user) {
                throw new ForbiddenException("Username atau password salah")
            }

            // Jika password tidak cocok
            const isPasswordMatch = await argon.verify(user.password, dto.password);
            if (!isPasswordMatch) {
                throw new ForbiddenException("Username atau password salah")
            }

            const token = await this.singToken(user.id, user.username, user.role);
            // Password tidak disertakan pada response
            delete user.password;

            return {
                ...token, user: user,
            }
        }
        catch (error) {
            throw error;
        }
    }

    async singToken(userId: number, username: string, role: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            username,
            role,
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: secret,
        });

        return {
            access_token: token,
        }
    }
}
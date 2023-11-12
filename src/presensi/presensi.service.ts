import { ConflictException, Injectable } from '@nestjs/common';
import { JenisAbsensi, StatusKehadiran, StatusPresensiMahasiswa, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfirmPresensiDto, PresensiByDosenDto, PresensiDto } from './dto';

@Injectable()
export class PresensiService {
    constructor(private prisma: PrismaService) { }

    async getPertemuanList(sesiMataKuliahId: number) {
        try {
            const sesiMataKuliah = await this.prisma.sesiMataKuliah.findUnique({
                where: { id: sesiMataKuliahId },
                include: {
                    Pertemuan: { include: { Presensi: true } }
                }
            })

            sesiMataKuliah.Pertemuan.sort((a, b) => a.pertemuanKe - b.pertemuanKe)

            return sesiMataKuliah
        } catch (error) {
            throw error
        }
    }

    async addJenisPresensi(dto: PresensiDto, pertemuanId: number) {
        try {
            const jenisPresensi = await this.prisma.presensi.create({
                data: {
                    jenisAbsensi: JenisAbsensi[dto.jenisAbsensi],
                    limitWaktu: dto.limitWaktu ? new Date(dto.limitWaktu) : null,
                    pertemuanId: pertemuanId,
                    sesiMataKuliahId: dto.sesiMataKuliahId,
                }
            })

            return jenisPresensi
        } catch (error) {
            if (error.code === 'P2002') throw new ConflictException('Jenis Presensi sudah ada');
            throw error
        }
    }

    async detailPresensi(sesiMataKuliahId: number, pertemuanId: number) {
        try {
            const presensi = await this.prisma.presensi.findFirst({
                where: { sesiMataKuliahId: sesiMataKuliahId, pertemuanId: pertemuanId, },
            })
            if (!presensi) throw new ConflictException('Presensi tidak ditemukan');

            const mahasiswa = await this.prisma.mataKuliahDiambil.findMany({
                where: { sesiMataKuliahId: presensi.sesiMataKuliahId },
                include: { mahasiswa: true }
            })

            const presensiMahasiswa = await this.prisma.presensiMahasiswa.findMany({
                where: { presensiId: presensi.id },
                include: { mahasiswa: true }
            })

            // gabungkan data mahasiswa dengan data presensi mahasiswa
            const data = mahasiswa.map((item) => {
                const presensi = presensiMahasiswa.find((presensi) => presensi.nim === item.nim)
                if (presensi) {

                    delete presensi.mahasiswa
                    return {
                        ...item.mahasiswa,
                        presensi: presensi
                    }
                } else {
                    return {
                        ...item.mahasiswa,
                        presensi: null
                    }
                }
            })

            return {
                presensi,
                data
            }
        } catch (error) {
            throw error
        }
    }

    async detailPresensiPerMahasiswa(id: number, user: User) {
        try {
            const presensiData = await this.prisma.presensi.findUnique({
                where: { id },
            })
            if (!presensiData) throw new ConflictException('Presensi tidak ditemukan');

            const mahasiswa = await this.prisma.mahasiswa.findUnique({
                where: {
                    nim: user.username
                }
            })
            console.log(mahasiswa.nim);
            const presensiMahasiswa = await this.prisma.presensiMahasiswa.findFirst({
                where: { presensiId: presensiData.id, nim: mahasiswa.nim },
            })

            // gabungkan data mahasiswa dengan data presensi mahasiswa


            const data = {
                ...mahasiswa,
                absensi: presensiMahasiswa
            }

            return {
                presensi: presensiData,
                data
            }
        } catch (error) {
            throw error
        }
    }

    async addStatusPresensiMahasiswa(presensiId: number, dto: PresensiByDosenDto) {
        try {
            const checkPresensi = await this.prisma.presensiMahasiswa.findFirst({
                where: { presensiId: presensiId, nim: dto.nim }
            })
            if (checkPresensi) throw new ConflictException('Presensi sudah ada');
            const presensi = await this.prisma.presensiMahasiswa.create({
                data: {
                    presensiId: presensiId,
                    nim: dto.nim,
                    statusKehadiran: StatusKehadiran[dto.statusKehadiran],
                    statusPresensi: StatusPresensiMahasiswa.diterima,
                    // ISO-8601 DateTime
                    jamMasuk: new Date().toISOString(),
                }
            })

            return presensi
        } catch (error) {
            throw error;
        }
    }

    async absenMasuk(user: User, presensiId: number, catatan: string) {
        try {
            const userIsMahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim: user.username }
            })
            if (!userIsMahasiswa) throw new ConflictException('Anda tidak memiliki akses');
            const presensi = await this.prisma.presensiMahasiswa.findFirst({
                where: { presensiId: presensiId, nim: user.username }
            })
            if (presensi) throw new ConflictException('Anda sudah absen masuk');

            const presensiData = await this.prisma.presensi.findUnique({
                where: { id: presensiId }
            })
            const date = new Date()
            if (presensiData.limitWaktu != null) {
                if (presensiData.limitWaktu < date) throw new ConflictException('Waktu absen sudah habis');
            }
            const presensiMahasiswa = await this.prisma.presensiMahasiswa.create({
                data: {
                    presensiId: presensiId,
                    nim: user.username,
                    statusKehadiran: StatusKehadiran.hadir,
                    statusPresensi: StatusPresensiMahasiswa.pending,
                    // ISO-8601 DateTime
                    jamMasuk: new Date().toISOString(),
                    catatan: catatan
                }
            })

            return presensiMahasiswa
        } catch (error) {
            throw error
        }
    }

    async confirmPresensiMahasiswa(id: number, user: User, dto: ConfirmPresensiDto) {
        try {
            const userIsDosen = await this.prisma.dosen.findUnique({
                where: { nip: user.username }
            })
            if (!userIsDosen) throw new ConflictException('Anda tidak memiliki akses');

            const getpresensiMahasiswa = await this.prisma.presensiMahasiswa.findUnique({
                where: { id }
            })

            const presensiMahasiswa = await this.prisma.presensiMahasiswa.update({
                where: { id },
                data: {
                    statusPresensi: StatusPresensiMahasiswa[dto.statusPresensi],
                    statusKehadiran: dto.statusKehadiran == null ? getpresensiMahasiswa.statusKehadiran : StatusKehadiran[dto.statusKehadiran],
                    alasanTolak: dto.alasanTolak,
                }
            })

            return presensiMahasiswa
        } catch (error) {
            throw error
        }
    }

}

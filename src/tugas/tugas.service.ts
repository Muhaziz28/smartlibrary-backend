import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, TugasStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import { NilaiDto, TolakDto } from './dto';

@Injectable()
export class TugasService {
    constructor(private prisma: PrismaService) { }

    async getTugas(user: User, pertemuanId: number, req: any) {
        try {
            const tugas = await this.prisma.tugas.findMany({ where: { pertemuanId: pertemuanId } })
            if (tugas.length === 0) throw new NotFoundException('Tugas tidak ditemukan');
            const tugasWithFile = tugas.map((tugas) => {
                if (tugas.file != null) tugas.file = `${req.protocol}://${req.headers.host}/public/tugas/${tugas.file}`;
                else tugas.file = null;
                return tugas;
            });
            return tugasWithFile;
        } catch (error) { throw error }
    }

    async getTugasById(user: User, id: number, req: any) {
        try {
            const tugas = await this.prisma.tugas.findUnique({ where: { id: id } })
            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');
            if (tugas.file != null) tugas.file = `${req.protocol}://${req.headers.host}/public/tugas/${tugas.file}`;
            else tugas.file = null;
            return tugas;
        } catch (error) { throw error }
    }

    async addTugas(data: any, id: number) {
        try {
            const tugas = await this.prisma.tugas.create({
                data: {
                    file: data.file,
                    link: data.link,
                    deskripsi: data.deskripsi,
                    tanggalPengumpulan: data.tanggal,
                    pertemuanId: id,
                }
            });
            if (tugas.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'tugas', tugas.file);
            }
            return tugas;
        } catch (error) { throw error }
    }

    async updateTugas(user: User, data: any, id: number) {
        try {
            if (user.role == Role.MAHASISWA) throw new NotFoundException('Anda tidak memiliki akses');
            const tugas = await this.prisma.tugas.findUnique({ where: { id: id } });
            if (tugas.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'tugas', tugas.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const tugasUpdate = await this.prisma.tugas.update({
                data: {
                    file: data.file,
                    link: data.link,
                    deskripsi: data.deskripsi,
                    tanggalPengumpulan: data.tanggal,
                },
                where: { id: id }
            });
            return tugasUpdate;
        } catch (error) { throw error }
    }

    async removeTugas(user: User, id: number) {
        try {
            if (user.role == Role.MAHASISWA) throw new NotFoundException('Anda tidak memiliki akses');
            const tugas = await this.prisma.tugas.findUnique({ where: { id: id }, });
            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');
            if (tugas.file) {
                const filePath = path.join(__dirname, '..', '..', 'public', 'tugas', tugas.file);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                });
            }
            const tugasDelete = await this.prisma.tugas.delete({ where: { id: id } });
            return tugasDelete;
        } catch (error) { throw error }
    }

    async getTugasMatakuliahMahasiswa(user: User, tugasId: number, req: any) {
        try {
            const userDosen = await this.prisma.dosen.findUnique({ where: { nip: user.username } })
            if (!userDosen) throw new NotFoundException('Anda tidak memiliki akses');
            const tugas = await this.prisma.tugas.findUnique({
                where: { id: tugasId }, include: {
                    pertemuan: {
                        include: {
                            sesiMataKuliah: { include: { MataKuliahDiambil: { include: { mahasiswa: true } } } }
                        }
                    }
                }
            })
            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');
            const mahasiswa = Promise.all(tugas.pertemuan.sesiMataKuliah.MataKuliahDiambil.map(async (mhs) => {
                const tugasMahasiswa = await this.prisma.tugasMahasiswa.findMany({ where: { tugasId: tugasId, nim: mhs.nim } })
                tugasMahasiswa.forEach((tugas) => {
                    if (tugas.file != null) tugas.file = `http://${req.headers.host}/public/tugas-mahasiswa/${tugas.file}`;
                    else tugas.file = null;
                });
                return {
                    mahasiswa: {
                        nim: mhs.nim,
                        nama: mhs.mahasiswa.nama,
                        email: mhs.mahasiswa.email,
                        usernameTelegram: mhs.mahasiswa.usernameTelegram,
                        noTelp: mhs.mahasiswa.noTelp,
                        prodiId: mhs.mahasiswa.prodiId,
                        tugasMahasiswa: tugasMahasiswa
                    }
                }
            }));
            return mahasiswa;
        } catch (error) { throw error }
    }

    async terimaTugasMahasiswa(user: User, tugasMahasiswaId: number) {
        try {
            if (user.role != Role.DOSEN) throw new NotFoundException('Anda tidak memiliki akses');
            const checkTugas = await this.prisma.tugasMahasiswa.findUnique({
                where: { id: tugasMahasiswaId }
            })
            if (!checkTugas) throw new NotFoundException('Tugas tidak ditemukan')
            if (checkTugas.tugasStatus != TugasStatus.pending) throw new NotFoundException('Tugas sudah anda proses sebelumnya');
            // update tugas mahasiswa
            const tugasMahasiswa = await this.prisma.tugasMahasiswa.update({
                data: { tugasStatus: TugasStatus.diterima, tanggalProses: new Date() },
                where: { id: tugasMahasiswaId },
                include: { tugas: true, mahasiswa: true }
            })
            return tugasMahasiswa
        } catch (error) { throw error }
    }

    async tolakTugasMahasiswa(user: User, tugasMahasiswaId: number, dto: TolakDto) {
        try {
            if (user.role != Role.DOSEN) throw new NotFoundException('Anda tidak memiliki akses');
            const checkTugas = await this.prisma.tugasMahasiswa.findUnique({
                where: { id: tugasMahasiswaId }
            })
            if (!checkTugas) throw new NotFoundException('Tugas tidak ditemukan')
            if (checkTugas.tugasStatus !== TugasStatus.pending) throw new NotFoundException('Tugas sudah anda proses sebelumnya');
            // update tugas mahasiswa
            if (dto.alasanTolak == null || dto.alasanTolak == '') throw new NotFoundException('Alasan tolak tidak boleh kosong');
            const tugasMahasiswa = await this.prisma.tugasMahasiswa.update({
                data: { tugasStatus: TugasStatus.ditolak, alasanTolak: dto.alasanTolak, tanggalProses: new Date() },
                where: { id: tugasMahasiswaId },
                include: { tugas: true, mahasiswa: true }
            })
            return tugasMahasiswa
        } catch (error) { throw error }
    }

    async nilaiTugasMahasiswa(user: User, tugasMahasiswaId: number, dto: NilaiDto) {
        try {
            if (user.role != Role.DOSEN) throw new NotFoundException('Anda tidak memiliki akses');
            const checkTugas = await this.prisma.tugasMahasiswa.findUnique({
                where: { id: tugasMahasiswaId }
            })
            if (!checkTugas) throw new NotFoundException('Tugas tidak ditemukan')
            if (checkTugas.tugasStatus !== TugasStatus.diterima) throw new NotFoundException('Tugas belum diterima');
            if (checkTugas.nilai != null) throw new NotFoundException('Tugas sudah dinilai');
            // update tugas mahasiswa
            if (dto.nilai < 0 || dto.nilai > 100) throw new NotFoundException('Nilai harus diantara 0-100');
            const tugasMahasiswa = await this.prisma.tugasMahasiswa.update({
                data: { nilai: dto.nilai },
                where: { id: tugasMahasiswaId },
                include: { tugas: true, mahasiswa: true }
            })
            return tugasMahasiswa
        } catch (error) { throw error }
    }
}

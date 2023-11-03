import { Injectable, NotFoundException } from '@nestjs/common';
import { TugasStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TugasMahasiswaService {
    constructor(private prisma: PrismaService) { }

    async getMyTugas(user: User, tugasId: number) {
        try {
            const userIsMahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim: user.username } })
            console.log(userIsMahasiswa)
            if (!userIsMahasiswa) throw new NotFoundException('Anda tidak memiliki akses');
            const tugas = await this.prisma.tugas.findUnique({ where: { id: tugasId } })
            if (!tugas) throw new NotFoundException('Tugas tidak ditemukan');
            const myTugas = await this.prisma.tugasMahasiswa.findMany({
                where: { tugasId: tugasId, nim: userIsMahasiswa.nim }, include: {
                    tugas: true
                }
            })
            return myTugas;
        } catch (error) { throw error }
    }

    async uploadMyTugas(user: User, data: any, tugasId: number) {
        try {
            const userIsMahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim: user.username } })
            if (!userIsMahasiswa) throw new NotFoundException('Anda tidak memiliki akses');
            // Jika upload tugas melewati batas pengumpulan
            const tugasMatakuliah = await this.prisma.tugas.findUnique({ where: { id: tugasId } })
            if (!tugasMatakuliah) throw new NotFoundException('Tugas tidak ditemukan');
            if (tugasMatakuliah.tanggalPengumpulan < new Date()) throw new NotFoundException('Waktu pengumpulan tugas telah berakhir');
            // Jika sudah mengumpulkan tugas, ada tugas pending
            const tugasMahasiswaPending = await this.prisma.tugasMahasiswa.findFirst({ where: { tugasId: tugasId, nim: userIsMahasiswa.nim, tugasStatus: TugasStatus.pending } })
            if (tugasMahasiswaPending) throw new NotFoundException('Tugas anda masih dalam proses review oleh dosen, silahkan tunggu');
            // Jika sudah mengumpulkan tugas, ada tugas diterima
            const tugasMahasiswaDiterima = await this.prisma.tugasMahasiswa.findFirst({ where: { tugasId: tugasId, nim: userIsMahasiswa.nim, tugasStatus: TugasStatus.diterima } })
            if (tugasMahasiswaDiterima) throw new NotFoundException('Tugas anda telah diterima oleh dosen, tidak dapat mengumpulkan tugas lagi');
            const tugas = await this.prisma.tugasMahasiswa.create({
                data: {
                    tugasId: tugasId,
                    nim: userIsMahasiswa.nim,
                    file: data.file,
                    link: data.link,
                    deskripsi: data.deskripsi,
                    tanggalUpload: new Date(),
                    tugasStatus: TugasStatus.pending,
                },
            });
            return tugas;
        } catch (error) { throw error }
    }
}

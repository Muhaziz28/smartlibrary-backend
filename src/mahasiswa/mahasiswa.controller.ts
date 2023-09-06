import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaDto, UpdateMahasiswaDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private mahasiswaService: MahasiswaService) { }

    // Menambahkan data mahasiswa hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Post()
    addMahasiswa(@Body() dto: MahasiswaDto) {
        return this.mahasiswaService.addMahasiswa(dto);
    }

    // Mendapatkan data mahasiswa hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Get()
    getMahasiswa(@Query() params: { page?: number, limit?: number, search?: string }) {
        try {
            const mahasiswa = this.mahasiswaService.getAllMahasiswa(params);
            return mahasiswa;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Mendapatkan data mahasiswa berdasarkan NIM hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Get(':nim')
    getMahasiswaByNim(@Param('nim') nim: string) {
        return this.mahasiswaService.getMahasiswaByNim(nim);
    }

    // Mengubah data mahasiswa hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Put(':nim')
    updateMahasiswa(@Param('nim') nim: string, @Body() dto: UpdateMahasiswaDto) {
        return this.mahasiswaService.updateMahasiswa(nim, dto);
    }

    // Menghapus data mahasiswa hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Delete(':nim')
    deleteMahasiswa(@Param('nim') nim: string) {
        return this.mahasiswaService.deleteMahasiswa(nim);
    }
}

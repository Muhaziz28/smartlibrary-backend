import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaDto } from './dto';

@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private mahasiswaService: MahasiswaService) { }

    @Post()
    async addMahasiswa(@Body() dto: MahasiswaDto) {
        return await this.mahasiswaService.addMahasiswa(dto);
    }

    @Get()
    async getMahasiswa(@Query() params: { page?: number, limit?: number, search?: string }) {
        try {
            const mahasiswa = await this.mahasiswaService.getAllMahasiswa(params);
            return mahasiswa;
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    @Get(':nim')
    async getMahasiswaByNim(@Param('nim') nim: string) {
        return await this.mahasiswaService.getMahasiswaByNim(nim);
    }
}

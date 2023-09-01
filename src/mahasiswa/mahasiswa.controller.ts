import { Body, Controller, Get, Post } from '@nestjs/common';
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
    async getMahasiswa() {
        return await this.mahasiswaService.getAllMahasiswa();
    }
}

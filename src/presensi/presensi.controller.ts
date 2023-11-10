import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PresensiService } from './presensi.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { ConfirmPresensiDto, PresensiByDosenDto, PresensiDto } from './dto';

@UseGuards(JwtGuard)
@Controller('presensi')
export class PresensiController {
    constructor(private presensiService: PresensiService) { }

    @Get(':sesiMataKuliahId')
    getPertemuanList(@Param('sesiMataKuliahId', ParseIntPipe) sesiMataKuliahId: number) {
        return this.presensiService.getPertemuanList(sesiMataKuliahId);
    }

    @Post(':pertemuanId')
    addJenisPresensi(@Body() dto: PresensiDto, @Param('pertemuanId', ParseIntPipe) pertemuanId: number) {
        return this.presensiService.addJenisPresensi(dto, pertemuanId);
    }

    @Get('detail/:id')
    getDetailPresensi(@Param('id', ParseIntPipe) id: number) {
        return this.presensiService.detailPresensi(id);
    }

    @Get('detail/mahasiswa/:id')
    getDetailPresensiPerMahasiswa(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.presensiService.detailPresensiPerMahasiswa(id, user);
    }

    @Post('presensi-mahasiswa/:presensiId')
    addpresensiMahasiswa(@Param('presensiId', ParseIntPipe) presensiId: number, @Body() dto: PresensiByDosenDto) {
        return this.presensiService.addStatusPresensiMahasiswa(presensiId, dto);
    }

    @Post('masuk/:presensiId')
    absenMasuk(@Param('presensiId', ParseIntPipe) presensiId: number, @GetUser() user: User, @Body('catatan') catatan?: string) {
        return this.presensiService.absenMasuk(user, presensiId, catatan);
    }

    @Put('confirm/:id')
    confirmPresensi(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Body() dto: ConfirmPresensiDto) {
        return this.presensiService.confirmPresensiMahasiswa(id, user, dto);
    }
}

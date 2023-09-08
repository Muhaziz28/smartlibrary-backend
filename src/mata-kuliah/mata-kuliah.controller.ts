import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MataKuliahService } from './mata-kuliah.service';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';
import { CreateMataKuliahDto, UpdateMataKuliahDto } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('mata-kuliah')
export class MataKuliahController {
    constructor(private matakuliahservice: MataKuliahService) { }

    // Menambahkan data matakuliah hanya dapat dilakukan oleh admin
    @Roles(Role.ADMIN)
    @Post()
    addMataKuliah(@Body() dto: CreateMataKuliahDto) {
        return this.matakuliahservice.addMataKuliah(dto);
    }

    // Mendapatkan data matakuliah dapat dilakukan oleh semua role
    @Get()
    getMataKuliah(@Query() params: { search?: string }) {
        return this.matakuliahservice.getMataKuliah(params);
    }

    // Mengubah data mata kuliah hanya dapat dilakukan oleh admin
    @Roles(Role.ADMIN)
    @Put(':id')
    updateMataKuliah(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMataKuliahDto) {
        return this.matakuliahservice.updateMataKuliah({ id }, dto);
    }
}

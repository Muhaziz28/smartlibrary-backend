import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProdiService } from './prodi.service';
import { CreateProdiDto } from './dto/create-prodi.dto';
import { UpdateProdiDto } from './dto/update-prodi.dto';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Controller('prodi')
export class ProdiController {
    constructor(private prodiService: ProdiService) { }

    // Menambahkan data prodi hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Post()
    addProdi(@Body() dto: CreateProdiDto) {
        return this.prodiService.addProdi(dto);
    }

    // Mengubah data prodi hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Put(':id')
    updateProdi(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProdiDto) {
        return this.prodiService.updateProdi({ id }, dto);
    }

    // Mendapatkan data prodi hanya boleh diakses oleh semua role
    @Get()
    getProdi(@Query() params: { search?: string }) {
        return this.prodiService.getProdi(params);
    }

    // Mendapatkan data prodi berdasarkan ID hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Get(':id')
    getProdiById(@Param('id', ParseIntPipe) id: number) {
        return this.prodiService.getProdiById(id);
    }

    // Menghapus data prodi hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteProdi(@Param('id', ParseIntPipe) id: number) {
        return this.prodiService.deleteProdi(id);
    }
}
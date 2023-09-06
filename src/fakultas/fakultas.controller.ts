import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FakultasService } from './fakultas.service';
import { CreateFakultasDto } from './dto';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';
import { RolesGuard } from 'src/role.guard';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Controller('fakultas')
export class FakultasController {
    constructor(private fakultasService: FakultasService) { }

    // Menambahkan data fakultas hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Post()
    addFakultas(@Body() dto: CreateFakultasDto) {
        return this.fakultasService.addFakultas(dto);
    }

    // Mendapatkan data fakultas hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Get()
    getFakultas(@Query() params: { search?: string }) {
        return this.fakultasService.getFakultas(params);
    }

    // Mendapatkan data fakultas berdasarkan ID hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Get(':id')
    getFakultasById(@Param('id', ParseIntPipe) id: number) {
        return this.fakultasService.getFakultasById(id);
    }

    // Mengubah data fakultas hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Put(':id')
    updateFakultas(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFakultasDto) {
        console.log(typeof id);
        return this.fakultasService.updateFakultas(id, dto);
    }

    // Menghapus data fakultas hanya boleh diakses oleh ADMIN
    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteFakultas(@Param('id', ParseIntPipe) id: number) {
        return this.fakultasService.deleteFakultas(id);
    }
}

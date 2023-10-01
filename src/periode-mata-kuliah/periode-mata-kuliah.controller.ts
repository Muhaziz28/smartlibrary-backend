import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { PeriodeMataKuliahService } from './periode-mata-kuliah.service';
import { AddPeriodeMataKuliahDto } from './dto';
import { query } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Controller('periode-mata-kuliah')
export class PeriodeMataKuliahController {
    constructor(private periodeMataKuliahService: PeriodeMataKuliahService) { }

    @Get()
    getMataKuliahPeriode(@Query() query: { periodeId: number, page?: number, limit?: number, search?: string }) {
        return this.periodeMataKuliahService.getMataKuliahPeriode(query);
    }

    @Roles(Role.ADMIN)
    @Post()
    addPeriodeMataKuliah(@Body() dto: AddPeriodeMataKuliahDto) {
        return this.periodeMataKuliahService.addMataKuliahPeriode(dto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    deletePeriodeMataKuliah(@Param('id', ParseIntPipe) id: number) {
        return this.periodeMataKuliahService.removeMataKuliahPeriode(id);
    }

    @Roles(Role.ADMIN)
    @Get('list-mata-kuliah')
    getListMataKuliahPeriode() {
        return this.periodeMataKuliahService.getListMataKuliahPeriode();
    }
}

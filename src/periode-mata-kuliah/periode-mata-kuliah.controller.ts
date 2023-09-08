import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PeriodeMataKuliahService } from './periode-mata-kuliah.service';
import { AddPeriodeMataKuliahDto } from './dto';
import { query } from 'express';

@Controller('periode-mata-kuliah')
export class PeriodeMataKuliahController {
    constructor(private periodeMataKuliahService: PeriodeMataKuliahService) { }

    @Get()
    getMataKuliahPeriode(@Query() query: { periodeId: number }) {
        return this.periodeMataKuliahService.getMataKuliahPeriode(query);
    }

    @Post()
    addPeriodeMataKuliah(@Body() dto: AddPeriodeMataKuliahDto) {
        return this.periodeMataKuliahService.addMataKuliahPeriode(dto);
    }
}

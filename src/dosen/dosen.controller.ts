import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { CreateDosenDto, UpdateDosenDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('dosen')
export class DosenController {
    constructor(private dosenService: DosenService) { }

    @Get()
    getDosen(@Query() params: { page?: number, limit?: number, search?: string }) {
        return this.dosenService.getAllDosen(params);
    }

    @Get(':nip')
    getDosenByNip(@Param('nip') nip: string) {
        return this.dosenService.getDosenByNip(nip);
    }

    @Post()
    addDosen(@Body() dto: CreateDosenDto) {
        return this.dosenService.addDosen(dto);
    }

    @Put(':nip')
    updateDosen(@Param('nip') nip: string, @Body() dto: UpdateDosenDto) {
        return this.dosenService.updateDosen(nip, dto);
    }

    @Delete(':nip')
    deleteDosen(@Param('nip') nip: string) {
        return this.dosenService.deleteDosen(nip);
    }
}

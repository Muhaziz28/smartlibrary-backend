import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SesiMataKuliahService } from './sesi-mata-kuliah.service';
import { AddSesiMataKuliahDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Controller('sesi-mata-kuliah')
export class SesiMataKuliahController {
    constructor(private sesiMataKuliahService: SesiMataKuliahService) { }

    @Get()
    getSesiMataKuliah(@Query() query: { search?: string }) {
        return this.sesiMataKuliahService.getSesiMataKuliah(query);
    }

    @Roles(Role.ADMIN)
    @Post()
    addSesiMataKuliah(@Body() dto: AddSesiMataKuliahDto) {
        return this.sesiMataKuliahService.addSesiMataKuliah(dto);
    }
}

import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PeriodeService } from './periode.service';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role } from '@prisma/client';
import { CreatePeriodeDto, UpdatePeriodeDto } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('periode')
export class PeriodeController {
    constructor(private periodeService: PeriodeService) { }

    // Mengambil data periode hanya boleh diakses oleh admin
    @Roles(Role.ADMIN)
    @Get()
    getPeriode(@Query() params: { page?: number, limit?: number, search?: string }) {
        try {
            const periode = this.periodeService.getAllPeriode(params);
            return periode;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Menambah data periode hanya boleh diakses oleh admin
    @Roles(Role.ADMIN)
    @Post()
    addPeriode(@Body() dto: CreatePeriodeDto) {
        return this.periodeService.addPeriode(dto);
    }

    // Mengubah data periode tidak akan mempengaruhi data periode yang sedang aktif.
    // Status aktif pada periode tidak dapat diubah.
    // Mengubah data periode hanya bisa dilakukan oleh admin
    @Roles(Role.ADMIN)
    @Put(':id')
    updatePeriode(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeriodeDto) {
        return this.periodeService.updatePeriode(id, dto);
    }
}
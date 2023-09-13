import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SesiMataKuliahService } from './sesi-mata-kuliah.service';
import { AddSesiMataKuliahDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('sesi-mata-kuliah')
export class SesiMataKuliahController {
    constructor(private sesiMataKuliahService: SesiMataKuliahService) { }

    @Get()
    getSesiMataKuliah(@Query() query: { search?: string }, @Req() req: any) {
        return this.sesiMataKuliahService.getSesiMataKuliah(query, req);
    }

    @Get('dosen')
    getSesiMataKuliahDosen(@Query() query: { search?: string }, @Req() req: any, @GetUser() user: User) {
        return this.sesiMataKuliahService.getSesiMataKuliahDosen(query, req, user);
    }

    @Roles(Role.ADMIN)
    @Post()
    addSesiMataKuliah(@Body() dto: AddSesiMataKuliahDto) {
        return this.sesiMataKuliahService.addSesiMataKuliah(dto);
    }
}

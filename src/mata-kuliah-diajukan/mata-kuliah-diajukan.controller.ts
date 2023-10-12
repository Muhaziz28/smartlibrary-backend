import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MataKuliahDiajukanService } from './mata-kuliah-diajukan.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { AddMataKuliahDiajukanDto } from './dto';

@UseGuards(JwtGuard)
@Controller('mata-kuliah-diajukan')
export class MataKuliahDiajukanController {
    constructor(private mataKuliahDiajukanService: MataKuliahDiajukanService) { }

    @Get()
    async getMataKuliahDiajukan(@GetUser() user: User) {
        return this.mataKuliahDiajukanService.getMataKuliahDiajukan(user);
    }

    @Post()
    async addMataKuliahDiajukan(@Body() dto: AddMataKuliahDiajukanDto, @GetUser() user: User) {
        return this.mataKuliahDiajukanService.addMataKuliahDiajukan(dto, user);
    }
}

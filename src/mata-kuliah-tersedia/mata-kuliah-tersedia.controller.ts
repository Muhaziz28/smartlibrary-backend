import { Controller, Get, UseGuards } from '@nestjs/common';
import { MataKuliahTersediaService } from './mata-kuliah-tersedia.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('mata-kuliah-tersedia')
export class MataKuliahTersediaController {
    constructor(private mataKuliahTerediaService: MataKuliahTersediaService) { }

    @Get()
    async getListMataKuliahTersedia(@GetUser() user: User) {
        return this.mataKuliahTerediaService.getListMataKuliahTersedia(user);
    }

}

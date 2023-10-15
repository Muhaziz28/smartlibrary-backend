import { Controller, Get, UseGuards } from '@nestjs/common';
import { MataKuliahDiambilService } from './mata-kuliah-diambil.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('mata-kuliah-diambil')
export class MataKuliahDiambilController {
    constructor(private mataKuliahDiambilService: MataKuliahDiambilService) { }

    @Get()
    async mataKuliahDiambil(@GetUser() user: User) {
        return this.mataKuliahDiambilService.mataKuliahDiambil(user);
    }
}

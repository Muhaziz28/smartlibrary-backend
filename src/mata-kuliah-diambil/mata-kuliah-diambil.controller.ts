import { Controller, Get } from '@nestjs/common';
import { MataKuliahDiambilService } from './mata-kuliah-diambil.service';

@Controller('mata-kuliah-diambil')
export class MataKuliahDiambilController {
    constructor(private mataKuliahDiambilService: MataKuliahDiambilService) { }

    @Get()
    async mataKuliahDiambil() {
        return this.mataKuliahDiambilService.mataKuliahDiambil();
    }
}

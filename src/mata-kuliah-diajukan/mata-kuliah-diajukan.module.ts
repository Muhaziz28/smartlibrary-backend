import { Module } from '@nestjs/common';
import { MataKuliahDiajukanService } from './mata-kuliah-diajukan.service';
import { MataKuliahDiajukanController } from './mata-kuliah-diajukan.controller';

@Module({
  providers: [MataKuliahDiajukanService],
  controllers: [MataKuliahDiajukanController]
})
export class MataKuliahDiajukanModule {}

import { Module } from '@nestjs/common';
import { MataKuliahDiambilService } from './mata-kuliah-diambil.service';
import { MataKuliahDiambilController } from './mata-kuliah-diambil.controller';

@Module({
  providers: [MataKuliahDiambilService],
  controllers: [MataKuliahDiambilController]
})
export class MataKuliahDiambilModule {}

import { Module } from '@nestjs/common';
import { PeriodeMataKuliahService } from './periode-mata-kuliah.service';
import { PeriodeMataKuliahController } from './periode-mata-kuliah.controller';

@Module({
  providers: [PeriodeMataKuliahService],
  controllers: [PeriodeMataKuliahController]
})
export class PeriodeMataKuliahModule {}

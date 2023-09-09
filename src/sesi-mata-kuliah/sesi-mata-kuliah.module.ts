import { Module } from '@nestjs/common';
import { SesiMataKuliahService } from './sesi-mata-kuliah.service';

@Module({
  providers: [SesiMataKuliahService]
})
export class SesiMataKuliahModule {}

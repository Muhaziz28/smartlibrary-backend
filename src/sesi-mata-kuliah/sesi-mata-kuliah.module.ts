import { Module } from '@nestjs/common';
import { SesiMataKuliahService } from './sesi-mata-kuliah.service';
import { SesiMataKuliahController } from './sesi-mata-kuliah.controller';

@Module({
  providers: [SesiMataKuliahService],
  controllers: [SesiMataKuliahController]
})
export class SesiMataKuliahModule {}

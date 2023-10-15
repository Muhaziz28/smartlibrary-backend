import { Module } from '@nestjs/common';
import { TugasService } from './tugas.service';
import { TugasController } from './tugas.controller';

@Module({
  providers: [TugasService],
  controllers: [TugasController]
})
export class TugasModule {}

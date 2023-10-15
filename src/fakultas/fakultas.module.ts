import { Module } from '@nestjs/common';
import { FakultasService } from './fakultas.service';
import { FakultasController } from './fakultas.controller';

@Module({
  providers: [FakultasService],
  controllers: [FakultasController],
  exports: [FakultasService],
})
export class FakultasModule { }

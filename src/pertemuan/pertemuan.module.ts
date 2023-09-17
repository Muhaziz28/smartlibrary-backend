import { Module } from '@nestjs/common';
import { PertemuanService } from './pertemuan.service';
import { PertemuanController } from './pertemuan.controller';

@Module({
  providers: [PertemuanService],
  controllers: [PertemuanController]
})
export class PertemuanModule {}

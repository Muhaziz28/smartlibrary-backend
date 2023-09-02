import { Module } from '@nestjs/common';
import { DosenService } from './dosen.service';

@Module({
  providers: [DosenService]
})
export class DosenModule {}

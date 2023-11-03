import { Module } from '@nestjs/common';
import { BahanAjarService } from './bahan-ajar.service';
import { BahanAjarController } from './bahan-ajar.controller';

@Module({
  providers: [BahanAjarService],
  controllers: [BahanAjarController]
})
export class BahanAjarModule {}

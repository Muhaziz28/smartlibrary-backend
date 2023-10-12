import { Module } from '@nestjs/common';
import { MataKuliahTersediaService } from './mata-kuliah-tersedia.service';
import { MataKuliahTersediaController } from './mata-kuliah-tersedia.controller';

@Module({
  providers: [MataKuliahTersediaService],
  controllers: [MataKuliahTersediaController]
})
export class MataKuliahTersediaModule {}

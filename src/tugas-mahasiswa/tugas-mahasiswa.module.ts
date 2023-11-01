import { Module } from '@nestjs/common';
import { TugasMahasiswaService } from './tugas-mahasiswa.service';
import { TugasMahasiswaController } from './tugas-mahasiswa.controller';

@Module({
  providers: [TugasMahasiswaService],
  controllers: [TugasMahasiswaController]
})
export class TugasMahasiswaModule {}

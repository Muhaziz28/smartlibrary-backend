import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenModule } from './dosen/dosen.module';
import { PrismaModule } from './prisma/prisma.module';
import { FakultasModule } from './fakultas/fakultas.module';
import { JurusanService } from './jurusan/jurusan.service';
import { JurusanController } from './jurusan/jurusan.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, MahasiswaModule, DosenModule, PrismaModule, FakultasModule],
  controllers: [JurusanController],
  providers: [JurusanService],
})
export class AppModule { }

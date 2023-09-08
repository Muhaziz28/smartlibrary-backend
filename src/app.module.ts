import { ConfigModule } from '@nestjs/config';
import { Module, } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenModule } from './dosen/dosen.module';
import { PrismaModule } from './prisma/prisma.module';
import { FakultasModule } from './fakultas/fakultas.module';
import { ProdiModule } from './prodi/prodi.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PeriodeModule } from './periode/periode.module';
import { AdminModule } from './admin/admin.module';
import { MataKuliahModule } from './mata-kuliah/mata-kuliah.module';
import { SesiMataKuliahModule } from './sesi-mata-kuliah/sesi-mata-kuliah.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, MahasiswaModule, DosenModule, PrismaModule, FakultasModule, ProdiModule, UserModule, PeriodeModule, AdminModule, MataKuliahModule, SesiMataKuliahModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule { }

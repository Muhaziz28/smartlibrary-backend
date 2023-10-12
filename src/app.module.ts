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
import { PeriodeMataKuliahModule } from './periode-mata-kuliah/periode-mata-kuliah.module';
import { PengantarModule } from './pengantar/pengantar.module';
import { MulterModule } from '@nestjs/platform-express';
import { PertemuanModule } from './pertemuan/pertemuan.module';
import { MataKuliahDiambilModule } from './mata-kuliah-diambil/mata-kuliah-diambil.module';
import { MataKuliahTersediaModule } from './mata-kuliah-tersedia/mata-kuliah-tersedia.module';
import { MataKuliahDiajukanModule } from './mata-kuliah-diajukan/mata-kuliah-diajukan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, MahasiswaModule, DosenModule, PrismaModule, FakultasModule, ProdiModule, UserModule, PeriodeModule, AdminModule, MataKuliahModule, SesiMataKuliahModule, PeriodeMataKuliahModule, PengantarModule, PertemuanModule, MataKuliahDiambilModule, MataKuliahTersediaModule, MataKuliahDiajukanModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule { }

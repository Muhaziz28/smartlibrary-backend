import { Module } from '@nestjs/common';
import { ModulPengantarService } from './modul-pengantar.service';
import { ModulPengantarController } from './modul-pengantar.controller';

@Module({
  providers: [ModulPengantarService],
  controllers: [ModulPengantarController]
})
export class ModulPengantarModule {}

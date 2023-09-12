import { Module } from '@nestjs/common';
import { PengantarService } from './pengantar.service';
import { PengantarController } from './pengantar.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MulterModule.register({ dest: './pengantar' }),
  ],
  providers: [PengantarService],
  controllers: [PengantarController]
})
export class PengantarModule { }

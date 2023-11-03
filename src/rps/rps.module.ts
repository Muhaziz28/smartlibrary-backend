import { Module } from '@nestjs/common';
import { RpsService } from './rps.service';
import { RpsController } from './rps.controller';

@Module({
  providers: [RpsService],
  controllers: [RpsController]
})
export class RpsModule {}

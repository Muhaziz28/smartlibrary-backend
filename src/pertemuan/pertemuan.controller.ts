import { Body, Controller, Get, Param, ParseIntPipe, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PertemuanService } from './pertemuan.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PertemuanDto } from './dto';

@Controller('pertemuan')
export class PertemuanController {
    constructor(private pertemuanService: PertemuanService) { }

    @Get(':id')
    async getPertemuan(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return await this.pertemuanService.getPertemuan(id, req);
    }

    @Put(':id')
    updatePertemuan(@Param('id', ParseIntPipe) id: number, @Body() dto: PertemuanDto) {
        return this.pertemuanService.updatePertemuan(dto, id);
    }
}

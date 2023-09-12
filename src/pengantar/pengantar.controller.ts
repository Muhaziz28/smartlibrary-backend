import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PengantarService } from './pengantar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AddPengantarDto } from './dto';

@Controller('pengantar')
export class PengantarController {
    constructor(private pengantarService: PengantarService) { }

    @Get(':id')
    getPengantar(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return this.pengantarService.getPengantar(id, req);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/pengantar',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            },
        }),
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB
        }
    }))
    addPengantar(@UploadedFile() file?: Express.Multer.File, @Body() addPengantarDto?: AddPengantarDto) {
        let sesiMataKuliahId: number;
        if (addPengantarDto.sesiMataKuliahId) {
            sesiMataKuliahId = parseInt(addPengantarDto.sesiMataKuliahId.toString(), 10);
            if (isNaN(sesiMataKuliahId)) {
                throw new BadRequestException('Invalid sesiMataKuliahId');
            }
        }

        const data = {
            sesiMataKuliahId,
            link: addPengantarDto.link,
            deskripsi: addPengantarDto.deskripsi,
            file: file.filename,
        }
        return this.pengantarService.addPengantar(data);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/pengantar',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            }
        })
    }))
    updatePengantar(@Param('id', ParseIntPipe) id: number, @UploadedFile() file?: Express.Multer.File, @Body() addPengantarDto?: AddPengantarDto) {
        let sesiMataKuliahId: number;
        if (addPengantarDto.sesiMataKuliahId) {
            sesiMataKuliahId = parseInt(addPengantarDto.sesiMataKuliahId.toString(), 10);
            if (isNaN(sesiMataKuliahId)) {
                throw new BadRequestException('Invalid sesiMataKuliahId');
            }
        }

        const data = {
            sesiMataKuliahId,
            link: addPengantarDto.link,
            deskripsi: addPengantarDto.deskripsi,
            file: file.filename,
        }
        return this.pengantarService.updatePengantar(id, data);
    }
}

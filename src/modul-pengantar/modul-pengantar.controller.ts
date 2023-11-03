import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ModulPengantarService } from './modul-pengantar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AddModulPengantarDto } from './dto';

@Controller('modul-pengantar')
export class ModulPengantarController {
    constructor(private modulPengantarService: ModulPengantarService) { }

    @Post(':pengantarId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/modul-pengantar',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            },
        }),
        limits: {
            // file size limited to 50MB
            fileSize: 50 * 1024 * 1024,
        }
    }))
    addModulPengantar(@Param('pengantarId', ParseIntPipe) pengantarId: number, @UploadedFile() file?: Express.Multer.File, @Body() dto?: AddModulPengantarDto,) {
        let data: any;
        if (file == null) {
            data = {
                pengantarId: pengantarId,
                judul: dto.judul,
                deskripsi: dto.deskripsi,
                link: dto.link,
                file: null,
            }
        } else {
            data = {
                pengantarId: pengantarId,
                judul: dto.judul,
                deskripsi: dto.deskripsi,
                link: dto.link,
                file: file.filename,
            }
        }
        return this.modulPengantarService.addModulPengantar(data, dto, pengantarId);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/modul-pengantar',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            },
        }),
        limits: {
            // file size limited to 50MB
            fileSize: 50 * 1024 * 1024,
        }
    }))
    updateModulPengantar(@Param('id', ParseIntPipe) id: number, @UploadedFile() file?: Express.Multer.File, @Body() dto?: AddModulPengantarDto,) {
        let data: any;
        if (file == null) {
            data = {
                judul: dto.judul,
                deskripsi: dto.deskripsi,
                link: dto.link,
                file: null,
            }
        } else {
            data = {
                judul: dto.judul,
                deskripsi: dto.deskripsi,
                link: dto.link,
                file: file.filename,
            }
        }
        return this.modulPengantarService.updateModulPengantar(id, data, dto);
    }

    @Delete(':id')
    deleteModulPengantar(@Param('id', ParseIntPipe) id: number) {
        return this.modulPengantarService.deleteModulPengantar(id);
    }
}

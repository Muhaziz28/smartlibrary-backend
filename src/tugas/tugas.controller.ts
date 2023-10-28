import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TugasService } from './tugas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TugasDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('tugas')
export class TugasController {
    constructor(private tugasService: TugasService) { }

    @Get(':pertemuanId')
    getTugas(@GetUser() user: User, @Param('pertemuanId', ParseIntPipe) pertemuanId: number, @Req() req: any) {
        return this.tugasService.getTugas(user, pertemuanId, req);
    }

    @Get('detail/:id')
    getTugasById(@GetUser() user: User, @Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return this.tugasService.getTugasById(user, id, req);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/tugas',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            }
        })
    }))
    updateTugas(@GetUser() user: User, @Param('id', ParseIntPipe) id: number, @UploadedFile() file?: Express.Multer.File, @Body() dto?: TugasDto) {
        const date = new Date(dto.tanggal).toISOString();

        let data: any;
        if (file != null) {
            data = {
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: file.filename,
                tanggal: date,
            }
        } else {
            data = {
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: null,
                tanggal: date,
            }
        }

        return this.tugasService.updateTugas(user, data, id);
    }

    @Post(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/tugas',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            }
        })
    }))
    addTugas(@Param('id', ParseIntPipe) id: number, @UploadedFile() file?: Express.Multer.File, @Body() dto?: TugasDto) {
        // ubah tanggal ke ISO-8601 DateTime.
        const date = new Date(dto.tanggal).toISOString();

        let data: any;
        if (file != null) {
            data = {
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: file.filename,
                tanggal: date,
            }
        } else {
            data = {
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: null,
                tanggal: date,
            }

        }
        return this.tugasService.addTugas(data, id);
    }

    @Delete(':id')
    deleteTugas(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        return this.tugasService.removeTugas(user, id);
    }
}

import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BahanAjarService } from './bahan-ajar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BahanAjarDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('bahan-ajar')
export class BahanAjarController {
    constructor(private bahanAjarService: BahanAjarService) { }

    @Post(':pertemuanId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/bahan-ajar',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            }
        })
    }))
    addBahanAjar(@Param('pertemuanId', ParseIntPipe) pertemuanId: number, @Body() dto: BahanAjarDto, @UploadedFile() file?: Express.Multer.File,) {
        let data: any;
        if (file != null) {
            data = {
                file: file.filename,
                link: dto.link,
                judul: dto.judul,
                video: dto.video,
            }
        } else {
            data = {
                file: null,
                link: dto.link,
                judul: dto.judul,
                video: dto.video,
            }

        }
        return this.bahanAjarService.addBahanAjar(pertemuanId, dto, data);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/bahan-ajar',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            }
        })
    }))
    updateBahanAjar(@GetUser() user: User, @Param('id', ParseIntPipe) id: number, @Body() dto: BahanAjarDto, @UploadedFile() file?: Express.Multer.File) {
        let data: any;
        if (file != null) {
            data = {
                file: file.filename,
                link: dto.link,
                judul: dto.judul,
                video: dto.video,
            }
        } else {
            data = {
                file: null,
                link: dto.link,
                judul: dto.judul,
                video: dto.video,
            }
        }

        return this.bahanAjarService.updateBahanAjar(id, data, data, user);
    }

    @Delete(':id')
    deleteBahanAjar(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        return this.bahanAjarService.removeBahanAjar(user, id);
    }
}

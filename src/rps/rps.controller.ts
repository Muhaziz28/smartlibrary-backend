import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RpsService } from './rps.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AddRPSDto } from './dto';

@UseGuards(JwtGuard)
@Controller('rps')
export class RpsController {
    constructor(private rpsService: RpsService) { }

    @Post(':pengantarId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/rps',
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
    addRps(@Param('pengantarId', ParseIntPipe) pengantarId: number, @UploadedFile() file?: Express.Multer.File, @Body() dto?: AddRPSDto,) {
        let data: any;
        if (file == null) {
            data = {
                pengantarId: pengantarId,
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: null,
            }
        } else {
            data = {
                pengantarId: pengantarId,
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: file.filename,
            }
        }
        return this.rpsService.addRps(data, dto, pengantarId);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/rps',
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
    updateRps(@Param('id', ParseIntPipe) id: number, @UploadedFile() file?: Express.Multer.File, @Body() dto?: AddRPSDto,) {
        let data: any;
        if (file == null) {
            data = {
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: null,
            }
        } else {
            data = {
                link: dto.link,
                deskripsi: dto.deskripsi,
                file: file.filename,
            }
        }
        return this.rpsService.updateRps(id, data, dto);
    }

    @Delete(':id')
    deleteRps(@Param('id', ParseIntPipe) id: number) {
        return this.rpsService.deleteRps(id);
    }
}

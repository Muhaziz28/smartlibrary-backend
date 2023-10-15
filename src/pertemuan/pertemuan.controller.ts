import { Body, Controller, Get, Param, ParseIntPipe, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PertemuanService } from './pertemuan.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PertemuanDto } from './dto';

@UseGuards(JwtGuard)
@Controller('pertemuan')
export class PertemuanController {
    constructor(private pertemuanService: PertemuanService) { }

    @Get(':id')
    async getPertemuan(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return await this.pertemuanService.getPertemuan(id, req);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/pertemuan',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname.split('.')[1];
                callback(null, `${name}-${Date.now()}.${fileExtName}`);
            }
        })
    }))
    updatePertemuan(@Param('id', ParseIntPipe) id: number, @UploadedFile() file?: Express.Multer.File, @Body() pertemuan?: PertemuanDto) {
        let data: any;

        if (file != null) {
            data = {
                link: pertemuan.link,
                deskripsi: pertemuan.deskripsi,
                file: file.filename,
            }
        }
        else {
            data = {
                link: pertemuan.link,
                deskripsi: pertemuan.deskripsi,
            }
        }
        return this.pertemuanService.updatePertemuan(data, id);
    }
}

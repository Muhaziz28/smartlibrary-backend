import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TugasMahasiswaService } from './tugas-mahasiswa.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadTugasDto } from './dto';

@UseGuards(JwtGuard)
@Controller('tugas-mahasiswa')
export class TugasMahasiswaController {
    constructor(private tugasMahasiswaService: TugasMahasiswaService) { }

    @Get(':tugasId')
    async getMyTugas(@GetUser() user: User, @Param('tugasId', ParseIntPipe) tugasId: number) {
        return this.tugasMahasiswaService.getMyTugas(user, tugasId);
    }

    @Post(':tugasId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/tugas-mahasiswa',
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
    addPengantar(@GetUser() user: User, @UploadedFile() file?: Express.Multer.File, @Body() addTugasDto?: UploadTugasDto, @Param('tugasId', ParseIntPipe) tugasId?: number) {
        let data: any;
        if (file == null) {
            data = {
                file: null,
                link: addTugasDto.link,
                deskripsi: addTugasDto.deskripsi,
            }
        } else {
            data = {
                link: addTugasDto.link,
                deskripsi: addTugasDto.deskripsi,
                file: file.filename,
            }
        }
        return this.tugasMahasiswaService.uploadMyTugas(user, data, tugasId);
    }
}

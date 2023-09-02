import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProdiService } from './prodi.service';
import { CreateProdiDto } from './dto/create-prodi.dto';
import { UpdateProdiDto } from './dto/update-prodi.dto';

@Controller('prodi')
export class ProdiController {
    constructor(private prodiService: ProdiService) { }

    @Post()
    async addProdi(@Body() dto: CreateProdiDto) {
        return await this.prodiService.addProdi(dto);
    }

    @Put(':id')
    async updateProdi(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProdiDto) {
        return await this.prodiService.updateProdi({ id }, dto);
    }

    @Get()
    async getProdi(@Query() params: { search?: string }) {
        return await this.prodiService.getProdi(params);
    }

    @Get(':id')
    async getProdiById(@Param('id', ParseIntPipe) id: number) {
        return await this.prodiService.getProdiById(id);
    }

    @Delete(':id')
    async deleteProdi(@Param('id', ParseIntPipe) id: number) {
        return await this.prodiService.deleteProdi(id);
    }
}
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { FakultasService } from './fakultas.service';
import { CreateFakultasDto } from './dto';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';

@Controller('fakultas')
export class FakultasController {
    constructor(private fakultasService: FakultasService) { }

    @Post()
    async addFakultas(@Body() dto: CreateFakultasDto) {
        return await this.fakultasService.addFakultas(dto);
    }

    @Get()
    async getFakultas(@Query() params: { search?: string }) {
        return await this.fakultasService.getFakultas(params);
    }

    @Get(':id')
    async getFakultasById(@Param('id', ParseIntPipe) id: number) {
        return await this.fakultasService.getFakultasById(id);
    }

    @Put(':id')
    async updateFakultas(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFakultasDto) {
        console.log(typeof id);
        return await this.fakultasService.updateFakultas(id, dto);
    }

    @Delete(':id')
    async deleteFakultas(@Param('id', ParseIntPipe) id: number) {
        return await this.fakultasService.deleteFakultas(id);
    }
}

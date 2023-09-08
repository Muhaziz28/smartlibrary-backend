import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    // Menambahkan data admin
    @Post()
    addAdmin(@Body() dto: CreateAdminDto) {
        return this.adminService.addAdmin(dto);
    }
}

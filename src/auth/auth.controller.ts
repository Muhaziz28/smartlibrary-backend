import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto, NimDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('check-nim')
    checkNim(@Body() dto: NimDto) {
        // ambil nim dari body
        const nimMahasiswa = this.authService.getNim(dto);
        return nimMahasiswa;
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signupMahasiswa(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('fakultas')
    getFakultas(@Query() params: { search?: string }) {
        return this.authService.getFakultas(params);
    }
} 
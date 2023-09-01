import { IsEmail, IsOptional, IsString } from "class-validator";

export class MahasiswaDto {
    @IsString()
    nim: string;

    @IsString()
    nama: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    usernameTelegram: string;

    @IsString()
    @IsOptional()
    noTelp: string;
}
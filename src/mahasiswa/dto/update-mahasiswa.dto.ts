import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateMahasiswaDto {
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
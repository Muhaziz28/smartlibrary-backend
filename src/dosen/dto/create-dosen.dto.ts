import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateDosenDto {
    @IsString()
    nip: string;

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
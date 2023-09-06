import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateDosenDto {
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

    @IsInt()
    fakultasId: number;
}
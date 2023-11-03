import { IsOptional, IsString } from "class-validator";

export class AddModulPengantarDto {
    @IsString()
    @IsOptional()
    judul: string;

    @IsString()
    @IsOptional()
    deskripsi: string;

    @IsString()
    @IsOptional()
    link: string;
}
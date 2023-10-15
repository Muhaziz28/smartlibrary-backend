import { IsOptional, IsString } from "class-validator";

export class TugasDto {
    @IsOptional()
    @IsString()
    link: string;

    @IsOptional()
    @IsString()
    deskripsi: string;

    @IsOptional()
    @IsString()
    tanggal: string;
}
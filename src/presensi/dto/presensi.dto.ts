import { IsNumber, IsOptional, IsString } from "class-validator";

export class PresensiDto {
    @IsString()
    jenisAbsensi: string;

    @IsString()
    @IsOptional()
    limitWaktu: string;

    @IsNumber()
    sesiMataKuliahId: number;
}
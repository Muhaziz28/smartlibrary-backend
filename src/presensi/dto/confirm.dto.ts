import { IsOptional, IsString } from "class-validator";

export class ConfirmPresensiDto {
    @IsString()
    @IsOptional()
    statusKehadiran: string;

    @IsString()
    statusPresensi: string;

    @IsString()
    @IsOptional()
    alasanTolak: string;
}
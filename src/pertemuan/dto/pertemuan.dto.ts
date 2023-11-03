import { IsOptional, IsString } from "class-validator";

export class PertemuanDto {
    @IsOptional()
    tanggalPertemuan: string;
}
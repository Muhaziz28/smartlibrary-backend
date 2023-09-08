import { IsInt, IsString } from "class-validator";

export class CreateMataKuliahDto {
    @IsString()
    namaMataKuliah: string;

    @IsString()
    kodeMataKuliah: string;

    @IsInt()
    sks: number;

    @IsInt()
    prodiId: number;
}
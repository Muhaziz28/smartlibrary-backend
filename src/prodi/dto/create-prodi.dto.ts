import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateProdiDto {
    @IsString()
    namaProdi: string;

    @IsString()
    @IsOptional()
    singkatan: string;

    @IsInt()
    fakultasId: number;
}
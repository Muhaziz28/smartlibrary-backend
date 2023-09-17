import { IsOptional, IsString } from "class-validator";

export class CreateFakultasDto {
    @IsString()
    namaFakultas: string;

    @IsString()
    @IsOptional()
    singkatan: string;
}

export class CreateProdiFakultasDto {
    @IsString()
    namaProdi: string;

    @IsString()
    @IsOptional()
    singkatan: string;
}
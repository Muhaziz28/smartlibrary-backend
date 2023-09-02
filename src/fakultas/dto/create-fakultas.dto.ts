import { IsOptional, IsString } from "class-validator";

export class CreateFakultasDto {
    @IsString()
    namaFakultas: string;

    @IsString()
    @IsOptional()
    singkatan: string;
}
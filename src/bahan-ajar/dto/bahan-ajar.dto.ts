import { IsOptional, IsString } from "class-validator";

export class BahanAjarDto {
    @IsOptional()
    @IsString()
    link: string;

    @IsString()
    judul: string;

    @IsOptional()
    @IsString()
    video: string;
}
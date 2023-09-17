import { IsOptional, IsString } from "class-validator";

export class PertemuanDto {
    @IsString()
    @IsOptional()
    link: string;

    @IsString()
    @IsOptional()
    deskripsi: string;
}
import { UploadedFile } from "@nestjs/common";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class AddPengantarDto {
    @IsString()
    @IsOptional()
    deskripsi: string;

    @IsString()
    @IsOptional()
    link: string;

    @IsString()
    @IsOptional()
    video: string;
}
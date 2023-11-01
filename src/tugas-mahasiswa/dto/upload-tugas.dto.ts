import { UploadedFile } from "@nestjs/common";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UploadTugasDto {
    @IsString()
    @IsOptional()
    link: string;

    @IsString()
    @IsOptional()
    deskripsi: string;
}
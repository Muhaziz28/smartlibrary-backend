import { IsOptional, IsString } from "class-validator";

export class AddRPSDto {
    @IsString()
    @IsOptional()
    link: string;

    @IsString()
    @IsOptional()
    deskripsi: string;
}
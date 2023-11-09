import { IsOptional, IsString } from "class-validator";

export class PresensiByDosenDto {
    @IsString()
    nim: string;

    @IsString()
    statusKehadiran: string;
}
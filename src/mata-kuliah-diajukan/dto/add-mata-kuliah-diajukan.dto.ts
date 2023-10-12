import { IsArray, IsInt } from "class-validator";

export class AddMataKuliahDiajukanDto {
    @IsArray()
    sesiMataKuliahId: number[];
}
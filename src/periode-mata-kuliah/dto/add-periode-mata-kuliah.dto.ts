import { IsArray, IsInt } from "class-validator";

export class AddPeriodeMataKuliahDto {
    @IsArray()
    mataKuliahId: number[];
}
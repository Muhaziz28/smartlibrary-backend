import { IsNotEmpty, IsNumber } from "class-validator";

export class NilaiDto {
    @IsNotEmpty()
    @IsNumber()
    nilai: number;
}
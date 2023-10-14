import { IsString } from "class-validator";

export class KonfirmasiMataKuliahDiajukanDto {
    @IsString()
    status: string;
}
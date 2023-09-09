import { IsInt, IsString } from "class-validator";

export class AddSesiMataKuliahDto {
    @IsInt()
    periodeMataKuliahId: number;

    @IsString()
    kodeSesi: string;

    @IsString()
    jadwal: string;

    @IsString()
    nip: string;
}
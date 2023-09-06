import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreatePeriodeDto {
    @IsString()
    mulai: string

    @IsString()
    selesai: string;
}
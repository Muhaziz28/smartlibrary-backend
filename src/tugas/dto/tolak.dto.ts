import { IsString } from "class-validator";

export class TolakDto {
    @IsString()
    alasanTolak: string;
}
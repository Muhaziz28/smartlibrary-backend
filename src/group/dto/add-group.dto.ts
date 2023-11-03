import { IsOptional, IsString } from "class-validator";

export class AddGroupDto {
    @IsOptional()
    @IsString()
    deskripsi: string

    @IsString()
    link: string
}
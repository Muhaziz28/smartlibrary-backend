import { IsString } from "class-validator";

export class NimDto {
    @IsString()
    nim: string;
}
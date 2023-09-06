import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    passwordConfirmation: string;

    @IsInt()
    prodiId: number;
}
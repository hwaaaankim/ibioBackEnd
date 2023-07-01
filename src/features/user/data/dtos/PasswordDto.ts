import { IsNotEmpty, IsString } from "class-validator"

export class PasswordDto {

    @IsString()
    @IsNotEmpty()
    newPassword: string

    @IsString()
    @IsNotEmpty()
    oldPassword: string

}
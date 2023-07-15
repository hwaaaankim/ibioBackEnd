import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class TestimonyDto {

    @IsString()
    @IsNotEmpty()
    role: string

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    description: string

}
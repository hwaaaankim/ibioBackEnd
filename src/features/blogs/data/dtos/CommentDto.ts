import { IsArray, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, isEnum } from "class-validator"

export class CommentDto {

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    code: string

    @IsString()
    @IsNotEmpty()
    blogId: string

    @IsString()
    @IsNotEmpty()
    comment: string

}
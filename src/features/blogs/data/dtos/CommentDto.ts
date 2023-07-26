import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, isEnum } from "class-validator"
import { type } from "os"

export class CommentDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fullName - is required', example: 'John Mark'})
    fullName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'code - is required'})
    code: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'blogId - is required'})
    blogId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'comment - is required'})
    comment: string

}